
import { useState } from "react";
import { PosScanner } from "@/components/pos/PosScanner";
import { PosCart } from "@/components/pos/PosCart";
import { Client } from "@/components/clients/ClientTable";
import { Article } from "@/components/articles/ArticleTable";
import { useToast } from "@/hooks/use-toast";

// Données fictives
const initialClients: Client[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    cardId: "CL-1001",
    monthlySpendings: 180.50,
    remainingBudget: 119.50
  },
  {
    id: "2",
    name: "Marie Lambert",
    email: "marie.lambert@example.com",
    cardId: "CL-1002",
    monthlySpendings: 75.20,
    remainingBudget: 224.80
  },
  {
    id: "3",
    name: "Théo Martin",
    email: "theo.martin@example.com",
    cardId: "CL-1003",
    monthlySpendings: 290.15,
    remainingBudget: 9.85
  }
];

const initialArticles: Article[] = [
  {
    id: "1",
    name: "Lait demi-écrémé",
    price: 0.95,
    category: "Produits laitiers",
    stock: 25
  },
  {
    id: "2",
    name: "Pain complet",
    price: 1.80,
    category: "Boulangerie",
    stock: 15
  },
  {
    id: "3",
    name: "Pommes Golden",
    price: 2.99,
    category: "Fruits & Légumes",
    stock: 40
  },
  {
    id: "4",
    name: "Yaourt nature",
    price: 2.35,
    category: "Produits laitiers",
    stock: 18
  },
  {
    id: "5",
    name: "Café moulu",
    price: 3.75,
    category: "Boissons",
    stock: 22
  }
];

interface CartItem {
  article: Article;
  quantity: number;
}

const POS = () => {
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [clients] = useState<Client[]>(initialClients);
  const [articles] = useState<Article[]>(initialArticles);
  const { toast } = useToast();
  
  const handleScanClient = (cardId: string, clientsList: Client[]) => {
    const client = clientsList.find(c => c.cardId === cardId);
    if (client) {
      setActiveClient(client);
      toast({
        title: "Client identifié",
        description: `Bienvenue, ${client.name}`,
      });
    } else {
      toast({
        title: "Client non trouvé",
        description: "Cette carte n'est pas enregistrée dans le système",
        variant: "destructive",
      });
    }
  };
  
  const handleScanProduct = (productId: string, articlesList: Article[]) => {
    const article = articlesList.find(a => a.id === productId);
    if (article) {
      if (article.stock <= 0) {
        toast({
          title: "Produit épuisé",
          description: "Ce produit n'est plus en stock",
          variant: "destructive",
        });
        return;
      }
      
      // Check if article is already in cart
      const existingItemIndex = cartItems.findIndex(item => item.article.id === article.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        setCartItems(updatedItems);
      } else {
        // Add new item to cart
        setCartItems([...cartItems, { article, quantity: 1 }]);
      }
      
      toast({
        title: "Produit ajouté",
        description: article.name,
      });
    } else {
      toast({
        title: "Produit non trouvé",
        description: "Ce produit n'est pas enregistré dans le système",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdateQuantity = (articleId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.article.id === articleId 
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };
  
  const handleRemoveItem = (articleId: string) => {
    setCartItems(prev => prev.filter(item => item.article.id !== articleId));
  };
  
  const handleCheckout = () => {
    // In a real application, this would send data to the server
    // and update stock, client spending, etc.
    setCartItems([]);
  };
  
  const handleClearCart = () => {
    setCartItems([]);
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Point de vente</h1>
        <p className="text-gray-500">Scanner les produits pour les ajouter au panier</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <PosScanner 
            onScanClient={handleScanClient}
            onScanProduct={handleScanProduct}
            articles={articles}
            clients={clients}
            activeClient={activeClient}
          />
        </div>
        <div className="lg:col-span-2">
          <PosCart 
            items={cartItems}
            client={activeClient}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onClearCart={handleClearCart}
          />
        </div>
      </div>
    </div>
  );
};

export default POS;
