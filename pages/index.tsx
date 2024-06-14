import React from "react";

import {useForm} from "react-hook-form";
import FormControl from "~/ui/form/FormControl";


import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Link,
  InputGroup,
  InputLeftAddon,
  Checkbox
} from '@chakra-ui/core';

import LandingNavBar from "~/landing/landingnavbar"
import Hero from "~/landing/hero"
import Features from "~/landing/features"
import Brands from "~/landing/brands"
import Pricing from "~/landing/pricing"
import Footer from "~/landing/footer"
import Moreabout from "~/landing/moreabout"
import Content from "~/ui/structure/Content"
import LandingLayout from "~/app/layouts/LandingLayout"
import FetchTenantCreation from '~/tenant/components/FetchTenantCreation'
import api from "~/session/api/client"
import {useToast} from "~/hooks/toast";
import {useTranslation} from "~/i18n/hooks";
import PhoneNumberInput from "~/landing/components/PhoneNumberInput";
import {COUNTRIES as countries4select} from "~/i18n/constants";
import { COUNTRIES } from "~/landing/components/countries";
import Select from "~/ui/inputs/Select";
import { getCountryTelCode } from "~/landing/components/countries";


const Initio: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const toast = useToast();
  const t = useTranslation();
  const [isLoading, toggleLoading] = React.useState(false);


  const onLoginSubmit = data => {
    toggleLoading(true);
    //setTimeout(() => {
    window.open(
      // window.location.origin+'/'+data.name+'/admin',
      process.env.APP_URL +'/'+data.name+'/admin',
      '_blank' // <- This is what makes it open in a new window.
    );
    toggleLoading(false);
    handleLoginVisibility();
    //}, 1200);
    //window.location.href = window.location.origin+'/'+data.name+'/admin'; 
  };
  
  const onRegisterSubmit = data => {
    toggleLoading(true);
    if(data.businessName &&
        data.storeName &&
        data.storePhone &&
        data.personalPhone &&
        data.country &&
        data.email &&
        data.password) {
      FetchTenantCreation.getTenant(data.businessName,
                                    (data.storeName).toLowerCase(),
                                    (storeCode+''+data.storePhone),
                                    (personalCode+''+data.personalPhone),
                                    data.country,
                                    data.email,
                                    data.password,
                                    acceptCheck).then((response) => {
        if(response?.ok) {
          api.signOut().then(() => {
            api
            .signIn(data.email, data.password)
            .catch(() => {
              toast({
                title: t("common.error"),
                description: "Error iniciando sesión",
                status: "error",
              });
              toggleLoading(false)
            }).then(() => {
              // window.open(
              //   `${window.location.origin}/${data.storeName}/admin`,
              //   '_blank' // <- This is what makes it open in a new window.
              // );
              // window.location.href = window.location.origin+'/'+data.storeName+'/admin'; 
              window.location.href = process.env.APP_URL +'/'+data.storeName+'/admin'; 
              setTimeout(() => {
                toggleLoading(false)
                handleRegisterVisibility()
              }, 3000) 
            });
          })
        } else {
          toast({
            title: "Error al crear la cuenta",
            description: "El nombre de usuario ya existe ó el Email ya está registrado",
            status: "error",
          });
          toggleLoading(false)
        }
      })
    }
  };


  const [modalRegisterVisible, setModalRegisterVisible] = React.useState(false);
  const handleRegisterVisibility = () => {
    setModalLoginVisible(false)
    setModalRegisterVisible(!modalRegisterVisible)
  }

  const [modalLoginVisible, setModalLoginVisible] = React.useState(false);
  const handleLoginVisibility = () => {
    setModalRegisterVisible(false)
    setModalLoginVisible(!modalLoginVisible)
  }

  const [acceptCheck, setAcceptCheck] = React.useState(true);
  const handleCheckChange = () => {
    setAcceptCheck(!acceptCheck)
  }

  const [acceptTerms, setAcceptTerms] = React.useState(true);
  const handleTermsChange = () => {
    setAcceptTerms(!acceptTerms)
  }
  

  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso
  }));
  const [countryNew, setCountryNew] = React.useState("PER");
  // const [storeCode, setstoreCode] = React.useState("51");
  const [storeCode, setstoreCode] = React.useState("51");
  const [personalCode, setpersonalCode] = React.useState("51");

  React.useEffect(() => {
      setstoreCode((getCountryTelCode(countryNew)).replaceAll("+", "").replaceAll(" ", ""));
      setpersonalCode((getCountryTelCode(countryNew)).replaceAll("+", "").replaceAll(" ", ""));
    }, [countryNew]);

  return (
    <>
      <LandingLayout>
        <LandingNavBar handleLoginVisibility={handleLoginVisibility} handleRegisterVisibility={handleRegisterVisibility}/>
        <Content>
          {(!modalRegisterVisible) ? <Hero handleRegisterVisibility={handleRegisterVisibility}/> : null}
          <Features/>
          <Brands/>
          <Box textAlign="center" maxWidth="6xl" m="auto" mt={8} mb={8} py={16} px={6} bg={'cyan.100'} >
            <Heading as="h1" size="2xl" mb={2} fontWeight={900} color="black">
              Crea tu catálogo hoy mismo y digitaliza los pedidos de tu negocio
            </Heading>
            <Text color={'cyan.600'} fontSize="xl" fontWeight={900}>
              ¡Es GRATIS! Y no requiere tarjetas de crédito.
            </Text>
            <Stack direction='row'>
              <Button
                m="auto"
                rounded={'full'}
                size={'lg'}
                mt={6}
                fontWeight={'900'}
                color={'white'}
                onClick={handleRegisterVisibility}
                bg={'cyan.500'}
                _hover={{ bg: 'cyan.600' }}>
                Crear catálogo
              </Button>
            </Stack>
          </Box>
          <Pricing/>
          <Moreabout/>
        </Content>
        <Footer handleLoginVisibility={handleLoginVisibility}/>
      </LandingLayout>

      <Modal id="REGISTER" blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={modalRegisterVisible} onClose={handleRegisterVisibility}>
        <ModalOverlay bg='cyan.500'/>
        <ModalContent py={5}>
          <ModalHeader fontSize={'2xl'}>Crea tu cuenta gratis</ModalHeader>
          <ModalCloseButton isDisabled={isLoading}/>
          <ModalBody>
            <form onSubmit={handleSubmit(onRegisterSubmit)} autoComplete="off">
              <Stack spacing={4}>
                <FormControl
                  isRequired
                  error={errors.businessName && "Este campo es requerido"}
                  name="businessName"
                  label="Nombre de tu negocio"
                >
                  <Input
                    size="lg"
                    isDisabled={isLoading}
                    variant='filled'
                    autoComplete="off"
                    name='businessName'
                    placeholder='Nombre de mi negocio'
                    ref={register({required: true, minLength: 4, maxLength: 140})}
                  />
                </FormControl>
                <FormControl
                  isRequired
                  error={errors.storeName && "El nombre de la cuenta debe tener al menos 4 caracteres, sin espacios y sin simbolos"}
                  name="storeName"
                  label="Nombre de usuario"
                >
                  <InputGroup size="lg">
                    <InputLeftAddon children='ferreteros.app/' pr={1} color='gray.500' bg='gray.200' borderWidth={0}/>
                    <Input
                      variant='filled'
                      isDisabled={isLoading}
                      paddingLeft={1}
                      name="storeName"
                      autoComplete="off"
                      placeholder='minegocio'
                      textTransform="lowercase"
                      onChange={(e) => {e.target.value = e.target.value.replace(/[^a-z0-9]/gi, '')}}
                      // onChange={handleStoreSlugChange}
                      // value={storeSlug}
                      ref={register({required: true, minLength: 4, maxLength: 70, pattern: /^[A-Za-z0-9]*$/})}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl
                  isRequired
                  error={errors.country && "Este campo es requerido"}
                  label="País"
                  name="country"
                >
                  <Select
                    ref={register({required: true})}
                    size="lg"
                    isDisabled={isLoading}
                    defaultValue={countryNew}
                    name="country"
                    placeholder="Selecciona un país"
                    onChange={e => setCountryNew(e.target.value)}
                  >
                    {Object.entries(countries4select).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  isRequired
                  error={errors.storePhone && "Este campo es requerido"}
                  name="storePhone"
                  label="WhatsApp donde recibirás los pedidos"
                >
                  <PhoneNumberInput
                    ref={register({required: true, minLength: 4, maxLength: 12, pattern: /^[0-9]+$/})}
                    country={countryNew}
                    isDisabled={isLoading}
                    options={countryOptions}
                    variant='filled'
                    size="lg"
                    onChange={value => setstoreCode(value)}
                    name="storePhone"
                    placeholder="111344400"
                  />
                </FormControl>
                <FormControl
                  isRequired
                  error={errors.personalPhone && "Este campo es requerido"}
                  name="personalPhone"
                  label="Telefono personal"
                  help='Este telefono puede ser igual que el del negocio'
                >
                  <PhoneNumberInput
                    ref={register({required: true, minLength: 4, maxLength: 12, pattern: /^[0-9]+$/})}
                    country={countryNew}
                    isDisabled={isLoading}
                    variant='filled'
                    size="lg"
                    options={countryOptions}
                    onChange={value => setpersonalCode(value)}
                    name="personalPhone"
                    placeholder="111344400"
                  />
                </FormControl>
                <FormControl
                  isRequired
                  error={errors.email && "Este campo es requerido, ingresa un email válido"}
                  label="E-mail"
                  name="email"
                >
                  <Input
                    variant='filled'
                    isDisabled={isLoading}
                    size="lg"
                    placeholder='tunegocio@gmail.com'
                    name="email"
                    ref={register({required: true, minLength: 4, maxLength: 70, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                  />
                </FormControl>
                <FormControl
                  isRequired
                  error={errors.password && "Este campo es requerido"}
                  label="Contraseña"
                  name="password"
                >
                  <Input
                    variant='filled'
                    isDisabled={isLoading}
                    size="lg"
                    placeholder='**********'
                    name="password"
                    type="password"
                    ref={register({required: true, minLength: 4, maxLength: 70})}
                  />
                </FormControl>
                <FormControl
                  name="accept"
                >
                  <Checkbox
                    isChecked={acceptTerms}
                    isDisabled={isLoading}
                    size="md"
                    name="accept"
                    onChange={handleTermsChange}>
                    {"Acepto las "}
                    <Link isExternal href="https://web.ferreteros.app/catalogos/terminos-y-condiciones">
                      Condiciones del Servicio
                    </Link>
                    {" y las "}
                    <Link isExternal href="https://web.ferreteros.app/catalogos/politica-de-privacidad">
                      Políticas de Privacidad
                    </Link>
                  </Checkbox>
                </FormControl>
                <FormControl
                  name="accept"
                >
                  <Checkbox
                    isChecked={acceptCheck}
                    isDisabled={isLoading}
                    size="md"
                    name="accept"
                    onChange={handleCheckChange}>
                    Recibir novedades sobre ferreteros.app
                  </Checkbox>
                </FormControl>
              </Stack>
            </form>
            <Stack pt={3}>
              <Button
                w="full"
                bg="cyan.500"
                isDisabled={!acceptTerms}
                size="lg"
                color="white"
                mr={3}
                isLoading={isLoading}
                onClick={handleSubmit(onRegisterSubmit)}
                _hover={{
                  bg: "cyan.600",
                  color: 'white'
                }}>
                {isLoading ? "Creando cuenta..." : "Crear tu cuenta"}
              </Button>
              <Flex justifyContent="center" w='100%' pt={4}>
                <Text>¿Ya tienes una cuenta?</Text>
                <Link ml={2} isDisabled={isLoading} fontWeight={500} textDecoration='underline' onClick={handleLoginVisibility}>¡Inicia sesión!</Link>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal id="LOGIN" blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={modalLoginVisible} onClose={handleLoginVisibility}>
        <ModalOverlay bg='cyan.500'/>
        <ModalContent py={5}>
          <ModalHeader fontSize={'2xl'}>Ingresa a tu cuenta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack >
              <form onSubmit={handleSubmit(onLoginSubmit)}>
                <FormControl
                  isRequired
                  error={errors.name && "El nombre de la cuenta debe tener al menos 4 caracteres"}
                  name="name"
                >
                  <InputGroup size="lg">
                    <InputLeftAddon children='ferreteros.app/' pr={1} color='gray.500'/>
                    <Input
                      variant='filled'
                      paddingLeft={1}
                      autoFocus
                      name="name"
                      placeholder='minegocio'
                      ref={register({required: true, minLength: 4, maxLength: 70})}
                    />
                  </InputGroup>
                </FormControl>
              </form>
            </Stack>
            <Stack pt={3}>
              <Button
                w="full"
                bg="cyan.500"
                size="lg"
                color="white"
                mr={3}
                onClick={handleSubmit(onLoginSubmit)}
                isLoading={isLoading}
                _hover={{
                  bg: "cyan.600",
                  color: 'white'
                }}>
                Iniciar sesión
              </Button>
              <Flex justifyContent="center" w='100%' pt={4}>
                <Text>¿No tienes cuenta?</Text>
                <Link ml={2} isDisabled={isLoading} fontWeight={500} textDecoration='underline' onClick={handleRegisterVisibility}>¡Creala gratis!</Link>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default Initio;
