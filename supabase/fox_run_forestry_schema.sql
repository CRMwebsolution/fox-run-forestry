create table public."FoxRunForestry" (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  caption text not null check (char_length(caption) between 1 and 1200),
  image_type text not null check (image_type in ('single', 'comparison')),
  single_image_url text,
  before_image_url text,
  after_image_url text,
  alt_text text not null default 'Fox Run Forestry project in Eastern North Carolina',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint fox_run_forestry_image_shape check (
    (
      image_type = 'single'
      and single_image_url is not null
      and before_image_url is null
      and after_image_url is null
    )
    or
    (
      image_type = 'comparison'
      and single_image_url is null
      and before_image_url is not null
      and after_image_url is not null
    )
  )
);

alter table public."FoxRunForestry" enable row level security;

revoke insert, update, delete, truncate, references, trigger
on table public."FoxRunForestry"
from anon;

grant select on public."FoxRunForestry" to anon, authenticated;
grant insert, update, delete on public."FoxRunForestry" to authenticated;

create policy "Public can view published Fox Run gallery items"
on public."FoxRunForestry"
for select
to anon, authenticated
using (published = true);

create policy "Fox Run admins can view all gallery items"
on public."FoxRunForestry"
for select
to authenticated
using (
  coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
);

create policy "Fox Run admins can add gallery items"
on public."FoxRunForestry"
for insert
to authenticated
with check (
  coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
);

create policy "Fox Run admins can edit gallery items"
on public."FoxRunForestry"
for update
to authenticated
using (
  coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
)
with check (
  coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
);

create policy "Fox Run admins can delete gallery items"
on public."FoxRunForestry"
for delete
to authenticated
using (
  coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
);

create policy "Fox Run admins can read gallery uploads"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'other_sites'
  and (storage.foldername(name))[1] = 'FoxRunForestry'
  and (storage.foldername(name))[2] = 'admin-gallery'
  and coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
);

create policy "Fox Run admins can upload gallery images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'other_sites'
  and (storage.foldername(name))[1] = 'FoxRunForestry'
  and (storage.foldername(name))[2] = 'admin-gallery'
  and coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
);

create policy "Fox Run admins can replace gallery images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'other_sites'
  and (storage.foldername(name))[1] = 'FoxRunForestry'
  and (storage.foldername(name))[2] = 'admin-gallery'
  and coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
)
with check (
  bucket_id = 'other_sites'
  and (storage.foldername(name))[1] = 'FoxRunForestry'
  and (storage.foldername(name))[2] = 'admin-gallery'
  and coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
);

create policy "Fox Run admins can delete gallery images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'other_sites'
  and (storage.foldername(name))[1] = 'FoxRunForestry'
  and (storage.foldername(name))[2] = 'admin-gallery'
  and coalesce(
    ((select auth.jwt()) -> 'app_metadata' ->> 'fox_run_forestry_admin')::boolean,
    false
  )
);

insert into public."FoxRunForestry"
  (title, caption, image_type, before_image_url, after_image_url, alt_text, sort_order, published)
values
  (
    'One-acre underbrush cleanup',
    'We cleared one acre in Newport, removing the underbrush and dead pines to leave the property cleaner, safer, and easier to use.',
    'comparison',
    'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/1/before.jpg',
    'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/1/after.jpg',
    'one-acre forestry mulching and dead pine removal project in Newport NC',
    1,
    true
  ),
  (
    'Making more room on 20 acres',
    'A repeat client brought us back to open up this 20-acre Newport parcel, creating more usable ground for a future front and back yard.',
    'comparison',
    'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/2/before.jpg',
    'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/2/after.jpg',
    '20-acre repeat-client land clearing project in Newport NC',
    2,
    true
  ),
  (
    'More room for the kids to play',
    'After building their new home in Newport, this family wanted more of the property opened up. We cleared the overgrowth and gave the kids room to enjoy the yard.',
    'comparison',
    'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/3/before.jpg',
    'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/3/after.jpg',
    'residential brush clearing around a newly built home in Newport NC',
    3,
    true
  ),
  (
    'Boundary access for an accurate survey',
    'This newly purchased parcel was packed with small pines. We cut approximate boundary lines so the surveyor could get in and confirm the property lines accurately.',
    'comparison',
    'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/4/before.jpg',
    'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/4/after.jpg',
    'small pine clearing for property boundary surveying in Eastern North Carolina',
    4,
    true
  );
