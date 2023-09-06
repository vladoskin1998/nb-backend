import { Injectable } from '@nestjs/common';
import { access, constants, mkdir, unlink, writeFile } from 'fs/promises';
import * as path from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  async uploadFiles(
    files: Array<Express.Multer.File>,
    dirName?: string,
  ): Promise<Array<string>> {
    const dirPath = path.join(__dirname, '../../', dirName || 'upload');
    const nameFiles: string[] = [];

    await this.accessDir(dirPath);

    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        try {
          const fileName = `${v4()}.${file.mimetype.split('/')[1]}`;
          nameFiles.push(fileName);
          await writeFile(`${dirPath}/${fileName}`, file.buffer);
          return true;
        } catch (error) {
          throw error;
        }
      }),
    );

    return nameFiles;
  }

  async deleteFiles(files: string[], dirName: string) {
    const dirPath = path.join(__dirname, '../../', dirName || 'upload');
    await Promise.all(
      files.map(async (fileName: string) => {
        try {
          await unlink(`${dirPath}/${fileName}`);
          return true;
        } catch (error) {
          throw error;
        }
      }),
    );
  }
  
  async accessDir(dirPath: string): Promise<void> {
    try {
      await access(dirPath, constants.R_OK | constants.W_OK);
    } catch (error) {
      try {
        await mkdir(dirPath);
      } catch (error) {
        throw error;
      }
    }
  }
}
