-- Create enum for purchase types
CREATE TYPE purchase_type AS ENUM (
  'Proto',
  'Production',
  'Testing',
  'Maintenance',
  'Research',
  'asset',
  'consumable'
);

-- Create enum for requisition status
CREATE TYPE requisition_status AS ENUM (
  'Pending',
  'Approved',
  'Rejected',
  'In Progress',
  'Completed',
  'Cancelled'
);

-- Create purchase requisitions table
CREATE TABLE purchase_requisitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_code TEXT NOT NULL,
  purchase_type purchase_type NOT NULL,
  requested_by UUID NOT NULL REFERENCES auth.users(id),
  notes TEXT,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  status requisition_status DEFAULT 'Pending' NOT NULL,
  total_value DECIMAL(12, 2) NOT NULL CHECK (total_value >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create purchase requisition items table for line items
CREATE TABLE purchase_requisition_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requisition_id UUID NOT NULL REFERENCES purchase_requisitions(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  item_code TEXT,
  description TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  units TEXT NOT NULL,
  vendor TEXT,
  cost DECIMAL(10, 2) NOT NULL CHECK (cost >= 0),
  currency TEXT DEFAULT 'USD' NOT NULL,
  alternate_part TEXT,
  link TEXT,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_purchase_requisitions_project_code ON purchase_requisitions(project_code);
CREATE INDEX idx_purchase_requisitions_requested_by ON purchase_requisitions(requested_by);
CREATE INDEX idx_purchase_requisitions_status ON purchase_requisitions(status);
CREATE INDEX idx_purchase_requisition_items_requisition ON purchase_requisition_items(requisition_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating updated_at columns
CREATE TRIGGER update_purchase_requisitions_updated_at
  BEFORE UPDATE ON purchase_requisitions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchase_requisition_items_updated_at
  BEFORE UPDATE ON purchase_requisition_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE purchase_requisitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_requisition_items ENABLE ROW LEVEL SECURITY;

-- Create policies for purchase_requisitions
CREATE POLICY "Users can view their own requisitions"
  ON purchase_requisitions
  FOR SELECT
  USING (auth.uid() = requested_by);

CREATE POLICY "Users can create their own requisitions"
  ON purchase_requisitions
  FOR INSERT
  WITH CHECK (auth.uid() = requested_by);

CREATE POLICY "Users can update their own pending requisitions"
  ON purchase_requisitions
  FOR UPDATE
  USING (auth.uid() = requested_by AND status = 'Pending');

-- Create policies for purchase_requisition_items
CREATE POLICY "Users can view items of their requisitions"
  ON purchase_requisition_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM purchase_requisitions
      WHERE id = requisition_id
      AND requested_by = auth.uid()
    )
  );

CREATE POLICY "Users can create items for their requisitions"
  ON purchase_requisition_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM purchase_requisitions
      WHERE id = requisition_id
      AND requested_by = auth.uid()
      AND status = 'Pending'
    )
  );

CREATE POLICY "Users can update items of their pending requisitions"
  ON purchase_requisition_items
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM purchase_requisitions
      WHERE id = requisition_id
      AND requested_by = auth.uid()
      AND status = 'Pending'
    )
  );
