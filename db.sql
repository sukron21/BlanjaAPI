create table users(
    id_user serial primary key,
    name varchar(40), -- customer name & store name
    email varchar(50),
    password text,
    phone varchar(20),
    user_type integer, -- 0 admin, 1 customer, 2 seller
    image text,
    main_address integer,
    user_created date
);

create table customer(
    id_customer integer primary key references users(id_user) on delete cascade,
    gender integer, -- 0 male, 1 female
    birth_date date
);

create table seller(
    id_seller integer primary key references users(id_user) on delete cascade,
    store_desc text
);

create table product(
    id_product serial primary key,
    seller integer references seller(id_seller) on delete cascade,
    product_name varchar(50),
    price integer,
    stock integer,
    condition integer, -- 0 new, 1 old
    photo text,
    color text,
    size text, -- 1 XS, 2 S, 3 M, 4 L, 5 XL
    category text,
    description text
);

create table orders(
    id_order serial primary key,
    userid integer references users(id_user) on delete cascade,
    item integer references product(id_product) on delete cascade,
    quantity integer,
    item_color varchar(20),
    item_size text, -- 1 XS, 2 S, 3 M, 4 L, 5 XL
    status integer -- 0 unpaid, 1 paid, 2 packed, 3 sent, 4 complete, 5 canceled
);

create table address(
    id_address serial primary key,
    userid integer references users(id_user) on delete cascade,
    address_name varchar(40), -- ex: home, work, storage
    recipient_name varchar(40),
    recipient_phone varchar(20),
    address text,
    post_code varchar(10),
    city varchar(40)
);

create table chat(
    id serial primary key,
    sender integer references users(id_user) on delete cascade,
    receiver integer references users(id_user) on delete cascade,
    message text,
    date_time date
);

create table transactions(
    id serial primary key,
    userid integer references users(id_user) on delete cascade,
    id_order integer references orders(id_order) on delete cascade,
    id_address integer references address(id_address),
    payment_method varchar(30),
    total_price integer,
    transaction_date date
);
