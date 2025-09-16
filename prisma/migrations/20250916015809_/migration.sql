-- CreateTable
CREATE TABLE "public"."category" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."size" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."colection" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "colection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."type_art" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "type_art_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."artwork" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "painter_id" INTEGER NOT NULL,
    "colection_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "type_art_id" INTEGER NOT NULL,
    "size_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."artwork_image" (
    "id" SERIAL NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artwork_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personId" INTEGER,
    "roleId" INTEGER,
    "stateId" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."person" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "last_name_business_name" TEXT NOT NULL,
    "id_ruc" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."client" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "person_id" INTEGER NOT NULL,
    "client_type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."painter" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "person_id" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "painter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."module" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sub_module" (
    "id" SERIAL NOT NULL,
    "module_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sub_module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."module_role" (
    "role_id" INTEGER NOT NULL,
    "module_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "module_role_pkey" PRIMARY KEY ("role_id","module_id")
);

-- CreateTable
CREATE TABLE "public"."sub_module_role" (
    "role_id" INTEGER NOT NULL,
    "module_id" INTEGER NOT NULL,
    "sub_module_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sub_module_role_pkey" PRIMARY KEY ("role_id","sub_module_id")
);

-- CreateTable
CREATE TABLE "public"."state" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."voucher" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "client_id" INTEGER NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "form_of_payment_id" INTEGER NOT NULL,
    "numeration" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."voucher_detail" (
    "id" SERIAL NOT NULL,
    "voucher_id" INTEGER NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voucher_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."currency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."form_of_payment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "form_of_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sale" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "voucher_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "form_of_payment_id" INTEGER NOT NULL,
    "sale_type" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sale_detail" (
    "id" SERIAL NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sale_detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "person_id_ruc_key" ON "public"."person"("id_ruc");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_numeration_key" ON "public"."voucher"("numeration");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_serie_key" ON "public"."voucher"("serie");

-- AddForeignKey
ALTER TABLE "public"."category" ADD CONSTRAINT "category_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."size" ADD CONSTRAINT "size_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."colection" ADD CONSTRAINT "colection_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."type_art" ADD CONSTRAINT "type_art_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_painter_id_fkey" FOREIGN KEY ("painter_id") REFERENCES "public"."painter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_colection_id_fkey" FOREIGN KEY ("colection_id") REFERENCES "public"."colection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_type_art_id_fkey" FOREIGN KEY ("type_art_id") REFERENCES "public"."type_art"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artwork" ADD CONSTRAINT "artwork_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "public"."size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artwork_image" ADD CONSTRAINT "artwork_image_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "public"."artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."person" ADD CONSTRAINT "person_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."client" ADD CONSTRAINT "client_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."client" ADD CONSTRAINT "client_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."painter" ADD CONSTRAINT "painter_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."painter" ADD CONSTRAINT "painter_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role" ADD CONSTRAINT "role_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_module" ADD CONSTRAINT "sub_module_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."module_role" ADD CONSTRAINT "module_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."module_role" ADD CONSTRAINT "module_role_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_module_role" ADD CONSTRAINT "sub_module_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_module_role" ADD CONSTRAINT "sub_module_role_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_module_role" ADD CONSTRAINT "sub_module_role_sub_module_id_fkey" FOREIGN KEY ("sub_module_id") REFERENCES "public"."sub_module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."voucher" ADD CONSTRAINT "voucher_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."voucher" ADD CONSTRAINT "voucher_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."voucher" ADD CONSTRAINT "voucher_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "public"."currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."voucher" ADD CONSTRAINT "voucher_form_of_payment_id_fkey" FOREIGN KEY ("form_of_payment_id") REFERENCES "public"."form_of_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."voucher_detail" ADD CONSTRAINT "voucher_detail_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "public"."voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."voucher_detail" ADD CONSTRAINT "voucher_detail_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "public"."artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale" ADD CONSTRAINT "sale_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale" ADD CONSTRAINT "sale_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "public"."voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale" ADD CONSTRAINT "sale_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale" ADD CONSTRAINT "sale_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "public"."currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale" ADD CONSTRAINT "sale_form_of_payment_id_fkey" FOREIGN KEY ("form_of_payment_id") REFERENCES "public"."form_of_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale_detail" ADD CONSTRAINT "sale_detail_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "public"."sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale_detail" ADD CONSTRAINT "sale_detail_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "public"."artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
