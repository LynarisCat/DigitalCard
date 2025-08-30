import { supabase } from './supabase.js';

// Generate a unique card ID
function generateCardId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Save card data to Supabase
export async function saveCard(cardData) {
  try {
    const cardId = generateCardId();
    const { data, error } = await supabase
      .from('cards')
      .insert([
        {
          id: cardId,
          title: cardData.title,
          name: cardData.name,
          message: cardData.text,
          speed: cardData.speed,
          color: cardData.color,
          shader: cardData.shaderNr,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    return { success: true, cardId, data };
  } catch (error) {
    console.error('Error saving card:', error);
    return { success: false, error: error.message };
  }
}

// Get card data by ID
export async function getCard(cardId) {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', cardId)
      .single();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching card:', error);
    return { success: false, error: error.message };
  }
}
