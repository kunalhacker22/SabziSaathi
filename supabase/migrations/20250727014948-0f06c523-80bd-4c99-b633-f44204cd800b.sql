-- Create a table to store searchable content for AI queries
CREATE TABLE public.search_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  content_type TEXT NOT NULL, -- 'product', 'order', 'vendor', 'hub'
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  searchable_text TEXT NOT NULL, -- Combined text for AI search
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.search_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own search content" 
ON public.search_content 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create search content" 
ON public.search_content 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own search content" 
ON public.search_content 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create index for better search performance
CREATE INDEX idx_search_content_searchable_text ON public.search_content USING gin(to_tsvector('english', searchable_text));
CREATE INDEX idx_search_content_type ON public.search_content(content_type);
CREATE INDEX idx_search_content_user_id ON public.search_content(user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_search_content_updated_at
BEFORE UPDATE ON public.search_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample searchable content
INSERT INTO public.search_content (content_type, title, description, searchable_text, metadata) VALUES
('product', 'Fresh Tomatoes', 'Premium quality tomatoes from local farms', 'Fresh Tomatoes Premium quality tomatoes from local farms vegetables healthy organic', '{"price": 50, "unit": "kg", "category": "vegetables"}'),
('product', 'Green Spinach', 'Nutrient-rich spinach leaves', 'Green Spinach Nutrient-rich spinach leaves vegetables healthy leafy greens iron', '{"price": 30, "unit": "bundle", "category": "leafy greens"}'),
('product', 'Red Onions', 'Fresh red onions for cooking', 'Red Onions Fresh red onions for cooking vegetables spicy aromatic', '{"price": 40, "unit": "kg", "category": "vegetables"}'),
('vendor', 'राज पटेल', 'Local vegetable vendor specializing in fresh produce', 'राज पटेल Local vegetable vendor specializing in fresh produce farmer market seller', '{"location": "Mumbai", "speciality": "vegetables", "rating": 4.5}'),
('hub', 'Green Valley Hub', 'Central distribution hub for fresh vegetables', 'Green Valley Hub Central distribution hub for fresh vegetables distribution center logistics', '{"location": "Delhi", "capacity": 1000, "type": "distribution"}')