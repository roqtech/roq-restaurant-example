import AppLayout from "layout/app/app.layout";
import { requireNextAuth, useRoqFileUploader, FileUpload } from "@roq/nextjs";
import { withAuthorization } from "hocs/withAuthorization";
import { useFetchRestaurant } from "hooks/use-fetch-restaurant.hook";
import Loader from "components/loader";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEditRestaurant } from "hooks/use-edit-restaurant.hook";
import { useState } from "react";

function RestaurantEditPage() {
  //SESSION IS MISSING RESTAURANT
  const { data, isLoading, error, refetch } = useFetchRestaurant(
    "49fadd13-e5fd-4719-b2f1-181db409a4c5"
  );
  const {
    edit,
    isLoading: editIsLoading,
    error: editError,
  } = useEditRestaurant();

  // To control the file upload - i.e trigger the upload when required,
  // you can use this hook to get the fileUploader object
  const fileUploader = useRoqFileUploader({
    fileCategory: "restaurant-files",
  });
  const { uploadFile, files, previews  } = fileUploader;
  const formik = useFormik({
    initialValues: {
      name: data?.name ?? "",
    },
    onSubmit: async (values) => {
      await edit("49fadd13-e5fd-4719-b2f1-181db409a4c5", values);
      for (let file of files) {
        await uploadFile({
          file,
          temporaryId: "49fadd13-e5fd-4719-b2f1-181db409a4c5",
        });
      }
      refetch();
    },
    enableReinitialize: true,
  });
  console.log(previews)
  return (
    <AppLayout>
      {(isLoading || editIsLoading) && <Loader />}
      <Flex>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="email">Name</FormLabel>
                <Input
                  name="name"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </FormControl>

              <FileUpload
                fileUploader={fileUploader}
                accept={["image/*"]}
                fileCategory="restaurant-files"
              />
              {previews && previews.map((preview) => <img src={preview.url} />)}
              <Button type="submit" colorScheme="purple" width="full">
                Edit
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(
  withAuthorization({
    allowedRoles: ["owner", "employee"],
  })(RestaurantEditPage)
);
