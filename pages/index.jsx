import { useEffect, useState } from 'react'
import { Button, Group, Text, Stack } from '@mantine/core'
import Background from '../components/Background'
import Link from 'next/link'


// const prisma = new PrismaClient()

// export const getStaticProps = async () => {
//   const prisma = new PrismaClient()
//   const data = await prisma.user.findMany(
//     {
//     where: { published: true },
//     include: {
//       author: {
//         select: { name: true },
//       },
//     },
//   }
//   );
//   return {
//     props: { allUsers: data }
//   };
// };

export default function Home({allUsers}) {

  const [users, setUsers] = useState([])

  return (
    <Background>
      <Stack>
        <Text size="40px">Welcome to Enigma</Text>
        <Text size="30px"> 
          Enigma is a project of Checklist/ToDo app <br/> created with React, NextJS by Vercel and Prisma
        </Text>
        <Group>
          <Link href="/login">
            <Button sx={{userSelect: 'none'}} size='lg' variant="light">Log in</Button>
          </Link>
          <Link href="/register">
            <Button sx={{userSelect: 'none'}} size='lg' variant="light">Register</Button>
          </Link>
        </Group>
        <Group>
          <img src="/react.ico" alt='React icon'/>
          <img width="70px" src='/favicon.ico' alt='Vercel'/>
          <img width="120px" src='/prisma-2.svg' alt='Prisma'/>
        </Group>
      </Stack>
    </Background>
  )
}