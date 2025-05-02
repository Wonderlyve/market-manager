
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Article {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  category: z.string().min(2, { message: "La catégorie doit contenir au moins 2 caractères" }),
  stock: z.coerce.number().min(0, { message: "Le stock ne peut pas être négatif" }),
  price: z.coerce.number().positive({ message: "Le prix doit être positif" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  defaultValues?: Article;
  onSubmit: (data: Omit<Article, "id">) => void;
  isSubmitting?: boolean;
}

export function ArticleForm({ defaultValues, onSubmit, isSubmitting = false }: ArticleFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      category: "",
      stock: 0,
      price: 0,
    },
  });

  const handleSubmit = (data: FormValues) => {
    // S'assurer que toutes les propriétés requises sont présentes
    const articleData: Omit<Article, "id"> = {
      name: data.name,
      category: data.category,
      stock: data.stock,
      price: data.price
    };
    
    onSubmit(articleData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'article" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <Input placeholder="Catégorie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "En cours..." : defaultValues ? "Mettre à jour" : "Ajouter"}
        </Button>
      </form>
    </Form>
  );
}
