WITH new_profile AS (
    INSERT INTO user_profile DEFAULT VALUES RETURNING id
)
INSERT INTO users (user_name, email_address, user_password, available_tokens, role, profile_id)
SELECT
    'USER1',
    'user1@example.com',
    'userpass',
    5,
    'USER',
    (SELECT id FROM new_profile);

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

INSERT INTO prompts (content) VALUES
             ('good'), ('evil'), ('lawful'), ('chaotic'), ('mean'),
             ('adventurous'), ('shy'), ('kind'), ('generous'), ('angry'),
             ('cruel'), ('cautious'), ('clever'), ('selfish'), ('sneaky'),
             ('reliable'), ('ugly'), ('honest'), ('weak'), ('lazy'), ('beautiful');

INSERT INTO prompts_collection (prompt1, prompt2, prompt3) VALUES
             (1, 2, 3), (4, 5, 6), (7, 8, 1);