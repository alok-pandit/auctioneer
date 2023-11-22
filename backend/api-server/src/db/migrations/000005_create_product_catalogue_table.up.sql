CREATE TABLE public."product_catalogue" (
    product_name text NOT NULL,
    quantity integer NOT NULL DEFAULT 0,
    price double precision NOT NULL,
    seller_id text NOT NULL,
    category text NOT NULL,
    unit_price double precision NOT NULL,
    discount double precision NULL,
    description text NULL,
    "updatedAt" timestamp(3) without time zone NULL DEFAULT CURRENT_TIMESTAMP,
    batch_id text NOT NULL,
    images text [] NULL DEFAULT ARRAY [
      'https://images.freeimages.com/images/large-previews/4ca/maldives-unseen-beauty-1641934.jpg'::text
    ]
);

ALTER TABLE
    public."product_catalogue"
ADD
    CONSTRAINT "product_catalogue_pkey" PRIMARY KEY (batch_id);