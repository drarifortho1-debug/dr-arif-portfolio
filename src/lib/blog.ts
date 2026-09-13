export function blogHref(post: { id: string; slug?: string }): string {
  return `/our-blogs/${post.slug || post.id}`;
}
