-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('USER', 'RIDER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "userName" TEXT,
    "avatar" TEXT,
    "dob" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "country" TEXT,
    "city" TEXT,
    "role" "ROLES"[] NOT NULL,
    "password" TEXT NOT NULL DEFAULT E'',
    "resetToken" TEXT NOT NULL DEFAULT E'',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "fcmToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
