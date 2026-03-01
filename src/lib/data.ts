// src/lib/data.ts
// Typed data loader that fetches /data/static.json
// Wraps api.ts functions and provides a unified hook

import { useState, useEffect } from 'react';
import type { StaticData } from './api';

let _cache: StaticData | null = null;

export async function fetchAllData(): Promise<StaticData> {
    if (_cache) return _cache;
    const res = await fetch('/data/static.json');
    if (!res.ok) throw new Error('Failed to load static data');
    _cache = await res.json();
    return _cache!;
}

export function useStaticData() {
    const [data, setData] = useState<StaticData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate realistic loading (300–600ms)
        const minDelay = new Promise<void>((r) => setTimeout(r, 400));
        Promise.all([fetchAllData(), minDelay])
            .then(([d]) => {
                setData(d);
                setLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}
