
import { useState } from "react";
import { StockManagement as StockManager } from "@/components/stock/StockManagement";
import { StockAlerts } from "@/components/stock/StockAlerts";
import { Article } from "@/components/articles/ArticleTable";

// Données fictives
const initialArticles: Article[] = [
  {
    id: "1",
    name: "Lait demi-écrémé",
    price: 0.95,
    category: "Produits laitiers",
    stock: 3
  },
  {
    id: "2",
    name: "Pain complet",
    price: 1.80,
    category: "Boulangerie",
    stock: 0
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
    stock: 8
  },
  {
    id: "5",
    name: "Café moulu",
    price: 3.75,
    category: "Boissons",
    stock: 22
  },
  {
    id: "6",
    name: "Pâtes",
    price: 1.25,
    category: "Épicerie",
    stock: 50
  },
  {
    id: "7",
    name: "Savon",
    price: 2.15,
    category: "Hygiène",
    stock: 5
  },
  {
    id: "8",
    name: "Eau minérale",
    price: 0.85,
    category: "Boissons",
    stock: 60
  }
];

const StockManagementPage = () => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  const handleUpdateStock = (articleId: string, newStockValue: number) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, stock: newStockValue }
          : article
      )
    );
  };
  
  const handleViewArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    // In a real app, this might scroll to the article in the list
    // or open a modal with more details
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion du stock</h1>
        <p className="text-gray-500">Contrôler et mettre à jour les niveaux de stock</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <StockManager 
            articles={articles} 
            onUpdateStock={handleUpdateStock} 
          />
        </div>
        <div>
          <StockAlerts 
            articles={articles} 
            onViewArticle={handleViewArticle}
          />
        </div>
      </div>
    </div>
  );
};

export default StockManagementPage;
