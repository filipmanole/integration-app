import { useIntegrationApp, useIntegrations } from "@integration-app/react";
import { Button } from "./components/ui/button";

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
          <div className="flex gap-2 justify-center items-center">
            <img
              className="w-8 h-8 rounded-lg pointer-events-none flex"
              src={integration.logoUri}
            />
            <div className="w-36 flex justify-center items-center">
              {integration.name}
            </div>
            <div className="flex justify-center items-center">
              {integration.connection ? (
                <div className="flex gap-4 justify-center items-center">
                  <Button
                    className="w-24"
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
                    className="w-24"
                    onClick={async () => {
                      onSelect?.(integration.key);
                    }}
                  >
                    {selected === integration.key ? "Selected" : "Select"}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4 justify-center items-center">
                  <Button
                    className="w-24"
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
                    className="w-24"
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
