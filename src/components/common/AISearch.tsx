import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AISearchProps {
  userType: "vendor" | "hub";
  className?: string;
}

interface SearchResult {
  response: string;
  sources: Array<{
    type: string;
    title: string;
    description: string;
    metadata: any;
  }> | null;
  query: string;
}

export const AISearch = ({ userType, className }: AISearchProps) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query: query.trim(), userType }
      });

      if (error) {
        throw new Error(error.message || 'Search failed');
      }

      setResult(data);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Search Assistant
          </CardTitle>
          <CardDescription>
            Ask me anything about products, vendors, or marketplace information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder={`Ask about ${userType === 'vendor' ? 'products, prices, or suppliers' : 'vendors, distribution, or capacity'}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading || !query.trim()}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {result && (
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">
                    Search Results for: "{result.query}"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {result.response}
                  </p>
                </CardContent>
              </Card>

              {result.sources && result.sources.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Related Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {result.sources.map((source, index) => (
                        <div 
                          key={index} 
                          className="p-3 rounded-lg border bg-card/50"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-medium text-sm">{source.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {source.description}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {source.type}
                            </Badge>
                          </div>
                          
                          {source.metadata && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {source.metadata.price && (
                                <span className="mr-3">₹{source.metadata.price}/{source.metadata.unit}</span>
                              )}
                              {source.metadata.location && (
                                <span className="mr-3">📍 {source.metadata.location}</span>
                              )}
                              {source.metadata.rating && (
                                <span className="mr-3">⭐ {source.metadata.rating}</span>
                              )}
                              {source.metadata.category && (
                                <span>🏷️ {source.metadata.category}</span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};