/*
  Warnings:

  - A unique constraint covering the columns `[menuName]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menu_menuName_key" ON "Menu"("menuName");
