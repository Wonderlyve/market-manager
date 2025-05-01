
import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "../articles/ArticleTable";

interface StockAlertsProps {
  articles: Article[];
  onViewArticle: (articleId: string) => void;
}

export function StockAlerts({ articles, onViewArticle }: StockAlertsProps) {
  const lowStockThreshold = 10; // Articles with stock below this value are considered "low"
  const criticalThreshold = 5; // Articles with stock below this value are considered "critical"
  
  const lowStockArticles = articles.filter(
    article => article.stock <= lowStockThreshold
  ).sort((a, b) => a.stock - b.stock); // Sort by stock level (ascending)
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alertes de stock
        </CardTitle>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {lowStockArticles.length} article{lowStockArticles.length !== 1 ? "s" : ""}
        </span>
      </CardHeader>
      <CardContent>
        {lowStockArticles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune alerte de stock
          </div>
        ) : (
          <div className="space-y-3">
            {lowStockArticles.map((article) => (
              <div 
                key={article.id} 
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  article.stock <= criticalThreshold 
                    ? "bg-red-50 border-red-200" 
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <div>
                  <h4 className="font-medium">{article.name}</h4>
                  <p className="text-sm">
                    <span className={`font-medium ${
                      article.stock <= criticalThreshold
                        ? "text-red-700"
                        : "text-amber-700"
                    }`}>
                      {article.stock}
                    </span>
                    <span className="text-muted-foreground"> en stock</span>
                  </p>
                </div>
                <button
                  onClick={() => onViewArticle(article.id)}
                  className={`text-xs px-3 py-1 rounded-full ${
                    article.stock <= criticalThreshold
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  }`}
                >
                  {article.stock === 0 
                    ? "STOCK ÉPUISÉ" 
                    : article.stock <= criticalThreshold 
                    ? "CRITIQUE" 
                    : "STOCK BAS"}
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
