import React, { useState } from "react";
import { useIntegrationApp } from "@integration-app/react";
import { Button } from "./components/ui/button";
import { Card, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { IntegrationSelector } from "./IntegrationSelector";

type CreateContactFields = {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
};

export const App = () => {
  const integrationApp = useIntegrationApp();

  const [integrationKey, setIntegrationKey] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [contactFields, setContactFields] = useState<CreateContactFields>({});
  const [error, setError] = useState<string | null>(null);

  const createContact = async () => {
    const { fullName, email, phone, companyName } = contactFields;
    if (!fullName || !email || !phone || !companyName || !integrationKey) {
      setError("Please fill in all fields and select an integration");
      return;
    }

    try {
      setLoading(true);
      const res = await integrationApp
        .connection(integrationKey)
        .action("create-contact")
        .run(contactFields);

      setError(null);
    } catch (error) {
      setError("Error while creating contact");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-[400px] p-8 flex flex-col gap-4">
        <CardTitle>Integration List</CardTitle>
        <IntegrationSelector
          selected={integrationKey}
          onSelect={(k: string) => setIntegrationKey(k)}
        />

        <Separator className="my-4" />

        <CardTitle>Contact Fields</CardTitle>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          type="fullName"
          placeholder="Full Name"
          onChangeCapture={(x) => {
            const fullName = x.currentTarget.value;
            setContactFields((v) => {
              return {
                ...v,
                fullName,
              };
            });
          }}
        />

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="Email"
          onChangeCapture={(x) => {
            const email = x.currentTarget.value;
            setContactFields((v) => {
              return {
                ...v,
                email,
              };
            });
          }}
        />

        <Label htmlFor="phone">Phone</Label>
        <Input
          type="phone"
          placeholder="Phone"
          onChangeCapture={(x) => {
            const phone = x.currentTarget.value;
            setContactFields((v) => {
              return {
                ...v,
                phone,
              };
            });
          }}
        />

        <Label htmlFor="companyName">Company Name</Label>
        <Input
          type="companyName"
          placeholder="Company Name"
          onChangeCapture={(x) => {
            const companyName = x.currentTarget.value;
            setContactFields((v) => {
              return {
                ...v,
                companyName,
              };
            });
          }}
        />

        <Separator className="my-4" />

        <Button onClick={createContact}>
          {loading ? <LoadingSpinner /> : "Create Contact"}
        </Button>

        {error && <ErrorMessage message={error} />}
      </Card>
    </div>
  );
};

export default App;
