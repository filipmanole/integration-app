import { useIntegrationApp, useIntegrations } from "@integration-app/react";
import { Button } from "./components/ui/button";
import { useTheme } from "./ThemeContext";
import React, { useEffect, useState } from "react";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";
import { CircleSlash, Loader2 } from "lucide-react";

export const IntegrationSelector: React.FC<{
  selected?: string;
  onSelect?: (integration: string) => void;
}> = ({ selected, onSelect }) => {
  const integrationApp = useIntegrationApp();
  const { items: integrations, refresh: refreshIntegrations } =
    useIntegrations();

  return (
    <div className="flex flex-col gap-4">
      {integrations.map((integration) => (
        <div className="" key={integration.key}>
          <div className="flex gap-2 justify-center align-middle">
            <img
              className="w-10 h-10 rounded-lg pointer-events-none"
              src={integration.logoUri}
            />
            <div className="w-36">{integration.name}</div>
            <div className="flex justify-center">
              {integration.connection ? (
                <div className="flex gap-4 h-max">
                  <Button
                    onClick={async () => {
                      await integrationApp
                        .integration(integration.key)
                        .disconnect();
                      refreshIntegrations();
                    }}
                  >
                    Disconnect
                  </Button>
                  <Button
                    onClick={async () => {
                      onSelect?.(integration.key);
                    }}
                  >
                    {selected === integration.key ? "Selected" : "Select"}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4 h-max">
                  <Button
                    onClick={async () => {
                      await integrationApp
                        .integration(integration.key)
                        .connect();
                      refreshIntegrations();
                    }}
                  >
                    Connect
                  </Button>

                  <Button
                    onClick={async () => {
                      await integrationApp.integration(integration.key).open();
                    }}
                  >
                    Configure
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

type CreateContactFields = {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
};

export const App = () => {
  const { toggleTheme } = useTheme();
  const integrationApp = useIntegrationApp();
  const { items: integrations, refresh: refreshIntegrations } =
    useIntegrations();

  const [integrationKey, setIntegrationKey] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [contactFields, setContactFields] = useState<CreateContactFields>({});
  const [error, setError] = useState<string | null>(null);

  const createContact = async () => {
    const { fullName, email, phone, companyName } = contactFields;
    if (!fullName || !email || !phone || !companyName || !integrationKey) {
      setError("Please fill in all fields or select an integration");
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
        <IntegrationSelector
          selected={integrationKey}
          onSelect={(k: string) => setIntegrationKey(k)}
        />

        <Separator />

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
          {loading ? (
            <Loader2 className={`mr-2 size-4 animate-spin`} />
          ) : (
            "Create Contact"
          )}
        </Button>

        {error && (
          <div className="text-red-500 text-sm flex items-center">
            <CircleSlash className="mr-2 size-4 animate-spin" color="#ef4444" />
            {error}
          </div>
        )}
      </Card>
    </div>
  );
};

export default App;
