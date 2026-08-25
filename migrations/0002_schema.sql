create table if not exists agencies (
  user_id text primary key,
  agency_name text not null default '',
  brand_color text not null default '#7dcea0',
  plan text not null default 'starter',
  created_at timestamptz not null default now()
);

create table if not exists clients (
  id serial primary key,
  user_id text not null,
  name text not null,
  industry text not null default 'Other',
  location text not null default '',
  gbp_url text not null default '',
  notes text not null default '',
  status text not null default 'active',
  created_at timestamptz not null default now()
);
create index if not exists clients_user_id_idx on clients (user_id);

create table if not exists reviews (
  id serial primary key,
  user_id text not null,
  client_id integer not null references clients(id) on delete cascade,
  reviewer_name text not null default '',
  rating integer not null,
  review_text text not null,
  ai_response text not null default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
create index if not exists reviews_user_id_idx on reviews (user_id);
create index if not exists reviews_client_id_idx on reviews (client_id);
