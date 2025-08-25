<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\URL;

class SitemapController extends Controller
{
    /**
     * Génère le sitemap XML du site
     */
    public function index(): Response
    {
        $baseUrl = URL::to('/');
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        // Pages principales
        $xml .= $this->generateUrl($baseUrl, '1.0', 'weekly');
        $xml .= $this->generateUrl($baseUrl . '/menu', '0.8', 'weekly');
        $xml .= $this->generateUrl($baseUrl . '/#contact', '0.6', 'monthly');
        
        // Éléments de menu
        $menuItems = MenuItem::all();
        foreach ($menuItems as $menuItem) {
            $xml .= $this->generateUrl(
                $baseUrl . '/menu/' . $menuItem->slug,
                '0.7',
                'monthly',
                $menuItem->updated_at->toISOString()
            );
        }
        
        $xml .= '</urlset>';
        
        return response($xml, 200)
            ->header('Content-Type', 'text/xml');
    }
    
    /**
     * Génère une balise URL pour le sitemap
     */
    private function generateUrl(string $loc, string $priority, string $changefreq, ?string $lastmod = null): string
    {
        $lastmod = $lastmod ?? now()->toISOString();
        
        return "    <url>\n" .
               "        <loc>{$loc}</loc>\n" .
               "        <lastmod>{$lastmod}</lastmod>\n" .
               "        <changefreq>{$changefreq}</changefreq>\n" .
               "        <priority>{$priority}</priority>\n" .
               "    </url>\n";
    }
}
