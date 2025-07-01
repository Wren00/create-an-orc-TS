WITH new_profile AS (
    INSERT INTO user_profile DEFAULT VALUES
        RETURNING id
)
INSERT INTO users (user_name, email_address, user_password, available_tokens, role, profile_id)
VALUES (
           'testadmin',
           'adminaccount@example.com',
           'adminorc',
           30,
           'ADMIN',
           (SELECT id FROM new_profile)
       );

WITH new_profile AS (
    INSERT INTO user_profile DEFAULT VALUES RETURNING id
)
INSERT INTO users (user_name, email_address, user_password, available_tokens, role, profile_id)
SELECT
    'basicUser',
    'useremail@example.com',
    'guestpass',
    5,
    'USER',
    id
FROM new_profile;

INSERT INTO background_images (image_name, url) VALUES
          ('background', 's3://create-an-orc-images/Misc Images/Background.png'),
          ('orc_base', 's3://create-an-orc-images/Misc Images/Orc_Base.png');

INSERT INTO orc_head (url) VALUES
            ('s3://create-an-orc-images/Head Images/Head1.png'),
            ('s3://create-an-orc-images/Head Images/Head2.png'),
            ('s3://create-an-orc-images/Head Images/Head3.png'),
            ('s3://create-an-orc-images/Head Images/Head4.png'),
            ('s3://create-an-orc-images/Head Images/Head5.png'),
            ('s3://create-an-orc-images/Head Images/Head6.png');

INSERT INTO orc_torso (url) VALUES
            ('s3://create-an-orc-images/Body Images/Body1.png'),
            ('s3://create-an-orc-images/Body Images/Body2.png'),
            ('s3://create-an-orc-images/Body Images/Body3.png'),
            ('s3://create-an-orc-images/Body Images/Body4.png'),
            ('s3://create-an-orc-images/Body Images/Body5.png');

INSERT INTO orc_legs (url) VALUES
            ('s3://create-an-orc-images/Body Images/Legs1.png'),
            ('s3://create-an-orc-images/Body Images/Legs2.png'),
            ('s3://create-an-orc-images/Body Images/Legs3.png'),
            ('s3://create-an-orc-images/Body Images/Legs4.png'),
            ('s3://create-an-orc-images/Body Images/Legs5.png');

INSERT INTO orc_images (head, body, legs) VALUES
            (1, 3, 5),
            (2, 4, 3),
            (3, 1, 2);


INSERT INTO catalogue (syllables) VALUES
            ('gak'), ('gik'), ('guk'), ('gek'), ('gok'),
            ('kak'), ('kik'), ('kuk'), ('kek'), ('kok'),
            ('mak'), ('mik'), ('muk'), ('mek'), ('mok'),
            ('nak'), ('nik'), ('nuk'), ('nek'), ('nok'),
            ('brak'), ('brik'), ('bruk'), ('brek'), ('brok'),
            ('lak'), ('lik'), ('luk'), ('lek'), ('lok'),
            ('hak'), ('hik'), ('huk'), ('hek'), ('hok'),
            ('gak'), ('gok'), ('guk'),
            ('gar'), ('gor'), ('gur'),
            ('har'), ('hor'), ('hur'),
            ('ga'), ('ra'), ('ma'), ('na'), ('ha'),
            ('go'), ('ro'), ('mo'), ('no'), ('ho'),
            ('ge'), ('re'), ('me'), ('ne'), ('he');

INSERT INTO prompts (adjectives) VALUES
             ('good'), ('evil'), ('lawful'), ('chaotic'), ('mean'),
             ('adventurous'), ('shy'), ('kind'), ('generous'), ('angry'),
             ('cruel'), ('cautious'), ('clever'), ('selfish'), ('sneaky'),
             ('reliable'), ('ugly'), ('honest'), ('weak'), ('lazy'), ('beautiful');

INSERT INTO prompts_collection (prompt1, prompt2, prompt3) VALUES
             (1, 2, 3), (4, 5, 6), (7, 8, 1);

