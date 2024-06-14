import React from "react";
import {Stack, Text} from "@chakra-ui/core";

import {useTranslation} from "~/i18n/hooks";

const ResetPasswordSuccess: React.FC = () => {
  const t = useTranslation();

  return (
    <Stack spacing={3} width="100%">
      <Text fontSize="xl" fontWeight={500}>
        {t("auth.resetPasswordSuccess.title")}
      </Text>
      <Text color="gray.500">{t("auth.resetPasswordSuccess.description")}</Text>
      <Text color="gray.500">
        <span>{t("auth.resetPasswordSuccess.contactUsAt")} </span>
        <Text color="primary.500">
          Email: {process.env.MANTAINER_EMAIL}
        </Text>
        .
      </Text>
    </Stack>
  );
};

export default ResetPasswordSuccess;
