-- Create POIs (Points of Interest) table
CREATE TABLE public.pois (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  area TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create itineraries table
CREATE TABLE public.itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  pois JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pois ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- POIs are public (anyone can read)
CREATE POLICY "POIs are viewable by everyone"
  ON public.pois FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can manage POIs (for admin)
CREATE POLICY "Authenticated users can insert POIs"
  ON public.pois FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update POIs"
  ON public.pois FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete POIs"
  ON public.pois FOR DELETE
  TO authenticated
  USING (true);

-- Itineraries policies (users can only see/manage their own)
CREATE POLICY "Users can view their own itineraries"
  ON public.itineraries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own itineraries"
  ON public.itineraries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own itineraries"
  ON public.itineraries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own itineraries"
  ON public.itineraries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert 20+ Mumbai POIs with realistic data
INSERT INTO public.pois (name, description, latitude, longitude, area, tags) VALUES
  ('Gateway of India', 'Iconic arch monument built in 1924, Mumbai''s most famous landmark overlooking the Arabian Sea', 18.9220, 72.8347, 'Colaba', ARRAY['monument', 'heritage', 'waterfront']),
  ('Marine Drive', 'Picturesque 3.6km promenade along the coast, known as the Queen''s Necklace for its night-time lighting', 18.9432, 72.8239, 'Marine Drive', ARRAY['promenade', 'scenic', 'waterfront']),
  ('Chhatrapati Shivaji Terminus', 'UNESCO World Heritage Victorian Gothic railway station, architectural masterpiece from 1887', 18.9398, 72.8355, 'CST', ARRAY['heritage', 'architecture', 'transport']),
  ('Taj Mahal Palace Hotel', 'Legendary luxury hotel from 1903, iconic Mumbai landmark with stunning architecture', 18.9216, 72.8330, 'Colaba', ARRAY['hotel', 'heritage', 'luxury']),
  ('Elephanta Caves', 'Ancient rock-cut cave temples on Elephanta Island, UNESCO World Heritage Site dating to 5th-8th century', 18.9633, 72.9315, 'Elephanta Island', ARRAY['heritage', 'temple', 'unesco']),
  ('Juhu Beach', 'Popular 6km beach loved by locals and tourists, famous for street food and sunset views', 19.0990, 72.8265, 'Juhu', ARRAY['beach', 'food', 'sunset']),
  ('Haji Ali Dargah', '1431 mosque and tomb on an islet, accessible via causeway during low tide', 18.9826, 72.8089, 'Worli', ARRAY['religious', 'heritage', 'waterfront']),
  ('Bandra-Worli Sea Link', 'Spectacular 5.6km cable-stayed bridge connecting Bandra and Worli, engineering marvel', 19.0330, 72.8180, 'Bandra', ARRAY['modern', 'architecture', 'scenic']),
  ('Crawford Market', 'Historic 1869 market with vibrant stalls selling fresh produce, spices, and goods', 18.9475, 72.8343, 'CST', ARRAY['market', 'shopping', 'heritage']),
  ('Siddhivinayak Temple', 'Famous 18th century Hindu temple dedicated to Lord Ganesha, one of Mumbai''s richest temples', 19.0176, 72.8305, 'Prabhadevi', ARRAY['religious', 'temple', 'heritage']),
  ('Hanging Gardens', 'Terraced gardens on Malabar Hill offering panoramic city views, built in 1881', 18.9558, 72.8051, 'Malabar Hill', ARRAY['park', 'scenic', 'heritage']),
  ('Colaba Causeway', 'Bustling commercial street famous for street shopping, cafes, and colonial architecture', 18.9074, 72.8200, 'Colaba', ARRAY['shopping', 'food', 'street']),
  ('Bandra Fort', '17th century Portuguese fort offering stunning sea views, popular sunset spot', 19.0443, 72.8200, 'Bandra', ARRAY['heritage', 'fort', 'scenic']),
  ('Sanjay Gandhi National Park', '104 sq km protected area with Kanheri Caves, tiger safari, and rich biodiversity', 19.2342, 72.9106, 'Borivali', ARRAY['nature', 'wildlife', 'park']),
  ('Prince of Wales Museum', 'Premier museum showcasing Indian art, archaeology, and natural history in Indo-Saracenic building', 18.9269, 72.8325, 'Fort', ARRAY['museum', 'heritage', 'art']),
  ('Worli Fort', 'Historic British fort from 1675 with Arabian Sea views, peaceful heritage site', 19.0096, 72.8136, 'Worli', ARRAY['heritage', 'fort', 'waterfront']),
  ('Linking Road', 'Popular shopping street in Bandra with trendy boutiques, street vendors, and cafes', 19.0550, 72.8290, 'Bandra', ARRAY['shopping', 'fashion', 'street']),
  ('Nehru Planetarium', 'Educational planetarium offering astronomy shows and exhibitions, opened in 1977', 18.9890, 72.8152, 'Worli', ARRAY['education', 'science', 'family']),
  ('Mahim Bay', 'Scenic bay area connecting Mahim and Bandra, popular for walks and photography', 19.0400, 72.8370, 'Mahim', ARRAY['waterfront', 'scenic', 'photography']),
  ('Leopold Cafe', 'Iconic 1871 cafe and bar on Colaba Causeway, famous for food and historic ambiance', 18.9159, 72.8307, 'Colaba', ARRAY['food', 'heritage', 'cafe']),
  ('Kala Ghoda', 'Art district with galleries, museums, and heritage buildings, hosts annual arts festival', 18.9278, 72.8318, 'Fort', ARRAY['art', 'culture', 'heritage']),
  ('Bandstand Promenade', 'Scenic 1.2km walkway along Bandra seafront, popular evening hangout with views', 19.0497, 72.8189, 'Bandra', ARRAY['promenade', 'scenic', 'waterfront']),
  ('Versova Beach', 'Quieter beach in Andheri West, known for fishing villages and sunset views', 19.1317, 72.8070, 'Versova', ARRAY['beach', 'fishing', 'sunset']);