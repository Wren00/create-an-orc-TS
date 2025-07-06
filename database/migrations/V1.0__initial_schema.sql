CREATE TYPE Role AS ENUM ('USER', 'VALIDUSER', 'ADMIN', 'DELETED');

CREATE TABLE IF NOT EXISTS public.user_profile
(
    id serial constraint user_profile_pk primary key
);

CREATE TABLE IF NOT EXISTS public.users (
    id              serial constraint users_pk primary key,
    user_name       text not null unique,
    email_address   text not null unique,
    user_password   text not null,
    available_tokens int not null default 5,
    role            Role not null default 'USER',
    profile_id      serial constraint user_profile_id_fk references user_profile(id),
    created_at      timestamptz default now(),
    updated_at      timestamptz default now(),
    is_deleted      boolean not null default false
);

CREATE TABLE IF NOT EXISTS public.orc_head
(
    id serial constraint orc_head_images_pk primary key,
    url text not null,
    created_At timestamptz default now(),
    updated_At timestamptz default now(),
    is_deleted boolean not null DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.orc_torso
(
    id serial constraint orc_torso_images_pk primary key,
    url text not null,
    created_At timestamptz default now(),
    updated_At timestamptz default now(),
    is_deleted boolean not null DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.orc_legs
(
    id serial constraint orc_legs_images_pk primary key,
    url text not null,
    created_At timestamptz default now(),
    updated_At timestamptz default now(),
    is_deleted boolean not null DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.orc_images
(
    id serial constraint orc_images_pk primary key,
    head int constraint head_image_fk references orc_head(id),
    body int constraint body_image_fk references orc_torso(id),
    legs int constraint legs_image_fk references orc_legs(id)
);

CREATE TABLE IF NOT EXISTS public.background_images
(
    id serial constraint background_images_pk primary key,
    image_name text not null,
    url text not null,
    created_At timestamptz default now(),
    updated_At timestamptz default now(),
    is_deleted boolean not null DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.prompts
(
    id serial constraint prompts_pk primary key,
    content text not null,
    created_At timestamptz default now(),
    updated_At timestamptz default now(),
    is_deleted boolean not null DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.prompts_collection
(
    id serial constraint prompts_collection_pk primary key,
    prompt1 int constraint prompt1_id_fk references prompts(id),
    prompt2 int constraint prompt2_id_fk references prompts(id),
    prompt3 int constraint prompt3_id_fk references prompts(id)
);

CREATE TABLE IF NOT EXISTS public.orcs
(
    id serial constraint orcs_pk primary key,
    name text not null,
    description text not null,
    prompts_collection_id serial constraint prompts_collection_id_fk references public.prompts_collection(id),
    orc_images_id serial constraint orc_images_id_fk references orc_images (id),
    user_id serial constraint user_id_fk references users(id),
    created_At timestamptz default now(),
    is_deleted boolean not null default false
);

CREATE TABLE IF NOT EXISTS public.catalogue
(
    id serial constraint catalogue_pk primary key,
    syllables text not null,
    created_At timestamptz default now(),
    updated_At timestamptz default now(),
    is_deleted boolean not null DEFAULT false
);
