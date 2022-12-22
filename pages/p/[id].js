// import prisma from '../../lib/prisma.js'

// export const getServerSideProps = async ({ params }) => {
//     const post = await prisma.post.findUnique({
//       where: {
//         id: String(params?.id),
//       },
//       include: {
//         author: {
//           select: { name: true },
//         },
//       },
//     });
//     return {
//       props: post,
//     };
//   };