
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, QrCode, Scan } from "lucide-react";
import { Client } from "../clients/ClientTable";
import { Article } from "../articles/ArticleTable";
import { cn } from "@/lib/utils";

interface PosScannerProps {
  onScanClient: (cardId: string, clients: Client[]) => void;
  onScanProduct: (productId: string, articles: Article[]) => void;
  articles: Article[];
  clients: Client[];
  activeClient: Client | null;
}

export function PosScanner({ onScanClient, onScanProduct, articles, clients, activeClient }: PosScannerProps) {
  const [scanMode, setScanMode] = useState<"client" | "product" | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanInput, setScanInput] = useState("");

  const handleScan = () => {
    if (!scanning) {
      setScanning(true);
      setScanInput("");
      // Simulate scan completion after 2 seconds
      setTimeout(() => {
        if (scanMode === "client") {
          // Simulate finding a random client
          const randomClient = clients[Math.floor(Math.random() * clients.length)];
          onScanClient(randomClient.cardId, clients);
        } else if (scanMode === "product") {
          // Simulate finding a random product
          const randomProduct = articles[Math.floor(Math.random() * articles.length)];
          onScanProduct(randomProduct.id, articles);
        }
        setScanning(false);
        setScanMode(null);
      }, 2000);
    }
  };

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanInput.trim() && scanMode) {
      if (scanMode === "client") {
        onScanClient(scanInput, clients);
      } else if (scanMode === "product") {
        onScanProduct(scanInput, articles);
      }
      setScanInput("");
      setScanMode(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scanner</CardTitle>
        <CardDescription>
          {activeClient 
            ? `Client actif: ${activeClient.name}` 
            : "Scannez une carte client pour commencer"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          {scanning ? (
            <div className="relative h-48 w-full max-w-xs border rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
              <div className="absolute left-0 right-0 h-0.5 bg-supermarket-blue animate-pulse-scan"></div>
              <Scan className="h-16 w-16 text-muted-foreground animate-pulse" />
            </div>
          ) : (
            <div className="h-48 w-full max-w-xs border rounded-md flex flex-col items-center justify-center bg-gray-50">
              {scanMode ? (
                <form onSubmit={handleManualEntry} className="w-full px-4 space-y-2">
                  <input
                    type="text"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder={`Scanner ${scanMode === "client" ? "carte client" : "produit"}`}
                    className="w-full p-2 border rounded"
                    autoFocus
                  />
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setScanMode(null)}>
                      Annuler
                    </Button>
                    <Button type="submit">Valider</Button>
                  </div>
                </form>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Scan className="h-16 w-16 mx-auto mb-2" />
                  <p>Sélectionnez un mode de scan</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => {
              setScanMode("client");
              !scanMode && handleScan();
            }} 
            disabled={scanning}
            className={cn(
              "flex flex-col h-20 gap-1",
              scanMode === "client" && "border-2 border-supermarket-blue"
            )}
          >
            <CreditCard className="h-6 w-6" />
            <span>Scanner Carte</span>
          </Button>
          <Button 
            onClick={() => {
              setScanMode("product");
              !scanMode && handleScan();
            }}
            disabled={scanning || !activeClient}
            className={cn(
              "flex flex-col h-20 gap-1",
              scanMode === "product" && "border-2 border-supermarket-blue"
            )}
            variant={!activeClient ? "outline" : "default"}
          >
            <QrCode className="h-6 w-6" />
            <span>Scanner Produit</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
