-- AlterTable
CREATE SEQUENCE "public".product_order_seq;
ALTER TABLE "public"."Product" ALTER COLUMN "order" SET DEFAULT nextval('"public".product_order_seq');
ALTER SEQUENCE "public".product_order_seq OWNED BY "public"."Product"."order";
