
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Article } from "../articles/ArticleTable";
import { ArrowDown, ArrowUp, BarChart, Package, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StockManagementProps {
  articles: Article[];
  onUpdateStock: (articleId: string, newStockValue: number) => void;
}

export function StockManagement({ articles, onUpdateStock }: StockManagementProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  const filteredArticles = articles.filter(article => 
    article.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectArticle = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      setSelectedArticle(article);
      setQuantity(1);
    }
  };
  
  const handleAddStock = () => {
    if (selectedArticle && quantity > 0) {
      onUpdateStock(selectedArticle.id, selectedArticle.stock + quantity);
      toast({
        title: "Stock mis à jour",
        description: `${quantity} unités ajoutées à "${selectedArticle.name}"`,
      });
      setQuantity(1);
    }
  };
  
  const handleRemoveStock = () => {
    if (selectedArticle && quantity > 0) {
      const newStock = Math.max(0, selectedArticle.stock - quantity);
      onUpdateStock(selectedArticle.id, newStock);
      toast({
        title: "Stock mis à jour",
        description: `${quantity} unités retirées de "${selectedArticle.name}"`,
      });
      setQuantity(1);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Sélectionner un article
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Rechercher un article..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2 font-medium">Nom</th>
                  <th className="text-left p-2 font-medium">Catégorie</th>
                  <th className="text-left p-2 font-medium">Stock actuel</th>
                  <th className="p-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                      Aucun article trouvé
                    </td>
                  </tr>
                ) : (
                  filteredArticles.map((article) => (
                    <tr 
                      key={article.id} 
                      className={`border-t hover:bg-muted/30 ${
                        selectedArticle?.id === article.id ? "bg-primary/10" : ""
                      }`}
                    >
                      <td className="p-2 font-medium">{article.name}</td>
                      <td className="p-2">{article.category}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.stock <= 5 
                            ? 'bg-red-100 text-red-800' 
                            : article.stock <= 20 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {article.stock}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <Button 
                          variant={selectedArticle?.id === article.id ? "default" : "outline"} 
                          size="sm"
                          onClick={() => handleSelectArticle(article.id)}
                        >
                          Sélectionner
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUp className="h-5 w-5 text-supermarket-success" />
            Ajouter au stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedArticle ? (
            <div>
              <p className="mb-4">
                Article sélectionné: <strong>{selectedArticle.name}</strong><br />
                Stock actuel: <strong>{selectedArticle.stock}</strong>
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <label className="text-sm font-medium mb-1 block">
                    Quantité à ajouter
                  </label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Sélectionnez un article pour gérer son stock
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddStock}
            disabled={!selectedArticle}
            className="w-full"
          >
            Ajouter au stock
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDown className="h-5 w-5 text-supermarket-danger" />
            Retirer du stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedArticle ? (
            <div>
              <p className="mb-4">
                Article sélectionné: <strong>{selectedArticle.name}</strong><br />
                Stock actuel: <strong>{selectedArticle.stock}</strong>
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <label className="text-sm font-medium mb-1 block">
                    Quantité à retirer
                  </label>
                  <Input 
                    type="number" 
                    min="1" 
                    max={selectedArticle.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Sélectionnez un article pour gérer son stock
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleRemoveStock}
            disabled={!selectedArticle || selectedArticle.stock <= 0}
            className="w-full"
            variant="outline"
          >
            Retirer du stock
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
