/**
 * Helper utilities for working with the multi-tenant form submissions system
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a client that works in both browser and server contexts
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

/**
 * Get client ID by name or domain
 * @param {Object} params - Search parameters
 * @param {string} params.name - Client name (e.g., "Sweet Salvage")
 * @param {string} params.domain - Client domain (e.g., "sweetsalvage.com")
 * @returns {Promise<string|null>} Client UUID or null if not found
 */
export async function getClientId({ name, domain }) {
  try {
    const supabase = getSupabaseClient();
    let query = supabase.from('clients').select('id');

    if (name) {
      query = query.eq('name', name);
    } else if (domain) {
      query = query.eq('domain', domain);
    } else {
      throw new Error('Either name or domain must be provided');
    }

    const { data, error } = await query.single();

    if (error) {
      console.error('Error fetching client:', error);
      return null;
    }

    return data?.id || null;
  } catch (error) {
    console.error('Error in getClientId:', error);
    return null;
  }
}

/**
 * Get form category ID by name
 * @param {string} categoryName - Category name (e.g., "email_list", "vendor_requests")
 * @returns {Promise<string|null>} Category UUID or null if not found
 */
export async function getCategoryId(categoryName) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('form_categories')
      .select('id')
      .eq('name', categoryName)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return null;
    }

    return data?.id || null;
  } catch (error) {
    console.error('Error in getCategoryId:', error);
    return null;
  }
}

/**
 * Submit a form entry to the database
 * @param {Object} params - Form submission parameters
 * @param {string} params.clientName - Client name (e.g., "Sweet Salvage")
 * @param {string} params.categoryName - Form category (e.g., "email_list", "vendor_requests")
 * @param {string} params.email - User email address
 * @param {Object} params.data - Additional form data as key-value pairs
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function submitFormEntry({ clientName, categoryName, email, data = {} }) {
  try {
    const supabase = getSupabaseClient();

    // Get client and category IDs
    const clientId = await getClientId({ name: clientName });
    const categoryId = await getCategoryId(categoryName);

    if (!clientId || !categoryId) {
      return {
        success: false,
        error: 'Invalid client or category configuration'
      };
    }

    // Call the secure database function to insert the submission
    const { data: submissionId, error: supabaseError } = await supabase
      .rpc('submit_form', {
        p_client_id: clientId,
        p_category_id: categoryId,
        p_email: email,
        p_data: data
      });

    if (supabaseError) {
      return {
        success: false,
        error: supabaseError.message,
        code: supabaseError.code
      };
    }

    return {
      success: true,
      data: { id: submissionId }
    };
  } catch (error) {
    console.error('Error in submitFormEntry:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get all form submissions for a client
 * @param {Object} params - Query parameters
 * @param {string} params.clientName - Client name
 * @param {string} params.categoryName - Optional: filter by category
 * @param {number} params.limit - Optional: limit results
 * @returns {Promise<Array>} Array of form submissions
 */
export async function getFormSubmissions({ clientName, categoryName, limit }) {
  try {
    const supabase = getSupabaseClient();
    const clientId = await getClientId({ name: clientName });

    if (!clientId) {
      console.error('Client not found');
      return [];
    }

    let query = supabase
      .from('form_submissions')
      .select(`
        *,
        clients:client_id(name, domain),
        form_categories:category_id(name, description)
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (categoryName) {
      const categoryId = await getCategoryId(categoryName);
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching submissions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFormSubmissions:', error);
    return [];
  }
}

/**
 * Create a new client
 * @param {Object} params - Client parameters
 * @param {string} params.name - Client name
 * @param {string} params.domain - Client domain
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function createClient({ name, domain }) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('clients')
      .insert([{ name, domain }])
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error in createClient:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
