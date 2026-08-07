import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch('/api/admin/templates');
    let templates = [];
    if (res.ok) {
      templates = await res.json();
    }
    return { templates };
  } catch (e) {
    console.error('Failed to load templates:', e);
    return { templates: [] };
  }
};
