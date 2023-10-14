db = db.getSiblingDB('nb_hb');

db.createUser(
    {
        user: "admin",
        pwd: "hE2slHKE9b0k4s18",
        roles: [
            {
                role: "readWrite",
                db: "nb_hb"
            }
        ]
    }
);
