import React from "react";

import {
  Stack,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  PseudoBox
} from '@chakra-ui/core';
import TypeWriter from './TypeWriter';

interface Props {
  handleRegisterVisibility: () => void;
}

const Hero: React.FC<Props> = (props) => {
  return (
    <Stack maxW={'95%'} m="auto">
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={{ base: 4, md: 4 }}
        py={{ base: 0, md: 35 }}>
        <Stack flex={1} spacing={{ base: 5, md: 3 }}>
          <Heading
            lineHeight={1.3}
            fontWeight={600}
            pt={8}
            fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}>
            <Text as={'span'} position={'relative'} fontSize={{base: 'md', sm: 'md', lg: 'lg'}} color={'cyan.500'}>
              CREA CATÁLOGOS
            </Text>
            <Text as={'span'} position={'relative'} fontSize={{base: 'lg', sm: 'lg', lg: '2xl'}} textTransform="lowercase" letterSpacing={'1px'} px={1} ml={2} color={'white'} bg="cyan.500">
              gratis
            </Text>
            <br />
            <Text
              as={'span'}
              pt={10}
              position={'relative'} fontWeight={800}>
              Para tu 
              <PseudoBox
                ml={{ base: 2, sm: 2, lg: 3 }}
                display='inline-block'
                _after={{
                  content: `"|"`,
                  textDecoration: "blink",
                }}>
                <TypeWriter
                  typingDelay={20}
                  erasingDelay={60}
                  newTextDelay={1200}
                  textArray={["Ferretería", "Distribuidora", "Importadora"]}
                  loop={true}
                />
              </PseudoBox>
            </Text>
            <br/>
            <Text as={'span'} color={'cyan.500'} fontWeight={500}>
              y recibe pedidos online
            </Text>
          </Heading>
          <Text color={'gray.500'} fontSize={{base:'md', sm:'md', lg:'xl'}}>
            Potencia tu negocio a nivel nacional y simplifica todas tus ventas.
          </Text>
          <Stack
            spacing={{ base: 2, sm: 4 }}
            direction='row'>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              px={6}
              mt={2}
              onClick={props.handleRegisterVisibility}
              color="white"
              bg={'cyan.500'}
              _hover={{ bg: 'cyan.600' }}>
              Crear catálogo
            </Button>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              px={4}
              mt={2}
              borderWidth={1}
              onClick={() => {window.open(`${window.location.origin}/demo`,'_blank')}}
              borderColor="cyan.600"
              color="cyan.600"
              bg={'white'}
              _hover={{ bg: 'cyan.100' }}>
              Ver demo
            </Button>
          </Stack>
        </Stack>
        <Stack
          flex={1}
          mt={4}
          justify={'center'}
          position={'relative'}
          w={'full'}>
          <Box
            position={'relative'}
            overflow={'hidden'}>
            <Image
              w={'100%'}
              h={'100%'}
              src={"/assets/hero.jpg"}
            />
          </Box>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
}


export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}

export default Hero;

