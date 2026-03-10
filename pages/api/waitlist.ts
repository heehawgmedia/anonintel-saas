import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface WaitlistEntry {
  email: string;
  timestamp: string;
  ip?: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    await fs.promises.mkdir(dataDir, { recursive: true });
  }
};

// Load existing waitlist data
const loadWaitlist = async (): Promise<WaitlistEntry[]> => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = await fs.promises.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading waitlist:', error);
    return [];
  }
};

// Save waitlist data
const saveWaitlist = async (waitlist: WaitlistEntry[]): Promise<void> => {
  try {
    await fs.promises.writeFile(DATA_FILE, JSON.stringify(waitlist, null, 2));
  } catch (error) {
    console.error('Error saving waitlist:', error);
    throw error;
  }
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Check if email already exists
const emailExists = async (email: string): Promise<boolean> => {
  const waitlist = await loadWaitlist();
  return waitlist.some(entry => entry.email.toLowerCase() === email.toLowerCase());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  try {
    await ensureDataDir();

    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    // Check for duplicate
    if (await emailExists(trimmedEmail)) {
      res.status(409).json({ error: 'This email is already on the waitlist' });
      return;
    }

    // Create entry
    const entry: WaitlistEntry = {
      email: trimmedEmail,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress || undefined,
    };

    // Save
    const waitlist = await loadWaitlist();
    waitlist.push(entry);
    await saveWaitlist(waitlist);

    res.status(201).json({
      success: true,
      message: 'Successfully joined the waitlist',
      data: {
        email: trimmedEmail,
        joinedAt: entry.timestamp,
      },
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process your request. Please try again.',
    });
  }
}
