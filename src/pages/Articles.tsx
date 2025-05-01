
import { useState } from "react";
import { ArticleTable, Article } from "@/components/articles/ArticleTable";
import { ArticleForm } from "@/components/articles/ArticleForm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Données fictives
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
    stock: 30
  },
  {
    id: "8",
    name: "Eau minérale",
    price: 0.85,
    category: "Boissons",
    stock: 60
  }
];

const categoriesList = [
  "Produits laitiers",
  "Boulangerie",
  "Fruits & Légumes",
  "Boissons",
  "Épicerie",
  "Hygiène"
];

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleAddArticle = (articleData: Omit<Article, "id">) => {
    const newArticle = {
      ...articleData,
      id: `${articles.length + 1}`,
    };
    
    setArticles([...articles, newArticle]);
    toast({
      title: "Article créé",
      description: `"${newArticle.name}" a été ajouté au catalogue`,
    });
  };
  
  const handleEditArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsFormOpen(true);
  };
  
  const handleUpdateArticle = (articleData: Omit<Article, "id">) => {
    if (!currentArticle) return;
    
    setArticles(articles.map(article => 
      article.id === currentArticle.id ? { ...articleData, id: article.id } : article
    ));
    
    toast({
      title: "Article mis à jour",
      description: `"${articleData.name}" a été mis à jour`,
    });
  };
  
  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!articleToDelete) return;
    
    const articleName = articles.find(a => a.id === articleToDelete)?.name;
    setArticles(articles.filter(article => article.id !== articleToDelete));
    
    toast({
      title: "Article supprimé",
      description: `"${articleName}" a été supprimé du catalogue`,
    });
    
    setDeleteDialogOpen(false);
    setArticleToDelete(null);
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500">Gérer le catalogue de produits</p>
        </div>
        <Button onClick={() => { setCurrentArticle(undefined); setIsFormOpen(true); }}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouvel article
        </Button>
      </div>
      
      <ArticleTable 
        articles={articles} 
        onEdit={handleEditArticle} 
        onDelete={handleDeleteClick} 
      />
      
      <ArticleForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={currentArticle ? handleUpdateArticle : handleAddArticle}
        article={currentArticle}
        categories={categoriesList}
      />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'article sera définitivement supprimé du catalogue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Articles;
