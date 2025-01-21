import React from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import Textarea from "../components/Common/Textarea";
import { Formik, Form, Field } from "formik";

export const TermsAndConditions = () => {
  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
        Terms and Conditions
        </h5>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto pl-[54px]">
        <Formik
          initialValues={{
            AlgemeneVoorwaarden: "",
            TermsandConditions: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <div className="flex gap-[20px] mb-[24px]">
              <div className="w-1/2">
                <div className="w-full md:mb-0">
                  <Field
                    type="text"
                    name="Algemene Voorwaarden"
                    id="AlgemeneVoorwaarden"
                    as="textarea"
                    placeholder="Omschrijving"
                    label="Algemene Voorwaarden"
                    component={Textarea} 
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-full md:mb-0">
                  <Field
                    type="text"
                    name="Terms and Conditions"
                    id="TermsandConditions"
                    as="textarea"
                    placeholder="Description"
                    label="Terms and Conditions"
                    component={Textarea}
                  />
                </div>
              </div>
            </div>
            <Button
              loading={false}
              type="submit"
              btnText="Save"
              paddingX="20px"
              textColor="#000000"
              breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
};