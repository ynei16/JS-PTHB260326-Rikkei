const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newAuthor = await prisma.author.create({
    data: {
      name: 'Nguyen Nhat Anh',
      books: { create: [{ title: 'Mat Biec', price: 150000 }, { title: 'Toi Thay Hoa Vang', price: 120000 }] }
    }
  });
  console.log('Created:', newAuthor);

  const authorWithBooks = await prisma.author.findUnique({
    where: { id: newAuthor.id }, include: { books: true }
  });
  console.log('Read:', authorWithBooks);

  if (authorWithBooks.books.length > 0) {
    const updatedBook = await prisma.book.update({
      where: { id: authorWithBooks.books[0].id }, data: { price: 160000 }
    });
    console.log('Updated:', updatedBook);
  }

  try {
    await prisma.book.delete({ where: { id: 9999 } });
  } catch (error) {
    console.log('Lỗi xoá ID ảo:', error.message);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());