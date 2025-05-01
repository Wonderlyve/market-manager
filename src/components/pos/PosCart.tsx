
import { ShoppingCart, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "../clients/ClientTable";
import { Article } from "../articles/ArticleTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  article: Article;
  quantity: number;
}

interface PosCartProps {
  items: CartItem[];
  client: Client | null;
  onUpdateQuantity: (articleId: string, quantity: number) => void;
  onRemoveItem: (articleId: string) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function PosCart({ 
  items, 
  client, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  onClearCart
}: PosCartProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const total = items.reduce(
    (sum, item) => sum + item.article.price * item.quantity,
    0
  );
  
  const handleCheckout = () => {
    if (!client) {
      toast({
        title: "Erreur",
        description: "Veuillez scanner une carte client d'abord",
        variant: "destructive",
      });
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Erreur",
        description: "Le panier est vide",
        variant: "destructive",
      });
      return;
    }
    
    if (client.remainingBudget < total) {
      toast({
        title: "Budget dépassé",
        description: `Le client ne dispose que de ${client.remainingBudget.toFixed(2)} € sur son plafond mensuel`,
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      onCheckout();
      setIsProcessing(false);
      toast({
        title: "Achat effectué",
        description: `Total: ${total.toFixed(2)} €`,
      });
    }, 1500);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Panier
          </span>
          <span className="text-sm font-normal">
            {items.length} article{items.length !== 1 ? "s" : ""}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        {items.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground p-6">
            <p>Le panier est vide</p>
          </div>
        ) : (
          <ScrollArea className="h-full px-4">
            <div className="space-y-4 py-2">
              {items.map((item) => (
                <div key={item.article.id} className="flex items-start justify-between gap-2">
                  <div className="flex-grow">
                    <div className="font-medium">{item.article.name}</div>
                    <div className="text-sm text-muted-foreground">{item.article.price.toFixed(2)} € / unité</div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => onUpdateQuantity(item.article.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </Button>
                    <div className="w-8 text-center">{item.quantity}</div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => onUpdateQuantity(item.article.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-destructive" 
                      onClick={() => onRemoveItem(item.article.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right min-w-[60px] font-medium">
                    {(item.article.price * item.quantity).toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex-col p-4 border-t">
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium text-lg">{total.toFixed(2)} €</span>
          </div>
          
          {client && (
            <div className="flex justify-between text-sm mb-4">
              <span className="text-muted-foreground">Budget restant</span>
              <span className={client.remainingBudget < total ? "text-destructive font-medium" : ""}>
                {client.remainingBudget.toFixed(2)} €
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              onClick={onClearCart}
              disabled={items.length === 0 || isProcessing}
            >
              Vider
            </Button>
            <Button 
              onClick={handleCheckout}
              disabled={!client || items.length === 0 || isProcessing}
            >
              {isProcessing ? "Traitement..." : "Payer"}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
