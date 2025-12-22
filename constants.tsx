import React from 'react';
import {
  PawPrint, DollarSign, CloudSun, HeartPulse, Cpu, Gamepad2,
  Database, Music, Camera, Book, Globe, Code2, Lock, Search,
  Filter, ExternalLink, Copy, Mail, Github, Instagram, Moon,
  Sun, Menu, X, CheckCircle2, Rocket, RefreshCw, Library,
  Star, Share2, Info, LayoutGrid, Zap, ShieldCheck,
  Globe2, Monitor, ShoppingCart, MessageSquare, Newspaper,
  Video, Map, Languages, Key, ArrowRight, ArrowLeft, Briefcase, Calendar,
  Cloud, Coins, FileText, Plane, Bug, Palette, Shield,
  Users, TrendingUp, Utensils, Award, Microscope, Link2,
  Car, Film, Thermometer, TestTube, FileSearch, Package,
  Smartphone, Image, ScrollText, Building2, Heart, Sparkles,
  Trash2, Download, ChevronDown
} from 'lucide-react';



export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  // Core Categories
  'Animals': <PawPrint className="w-4 h-4" />,
  'Anime': <Video className="w-4 h-4" />,
  'Anti-Malware': <Bug className="w-4 h-4" />,
  'Art & Design': <Palette className="w-4 h-4" />,
  'Authentication': <Lock className="w-4 h-4" />,
  'Blockchain': <Coins className="w-4 h-4" />,
  'Books': <Book className="w-4 h-4" />,
  'Business': <Briefcase className="w-4 h-4" />,
  'Calendar': <Calendar className="w-4 h-4" />,
  'Cloud Storage': <Cloud className="w-4 h-4" />,
  'Continuous Integration': <RefreshCw className="w-4 h-4" />,
  'Cryptocurrency': <Coins className="w-4 h-4" />,
  'Currency Exchange': <DollarSign className="w-4 h-4" />,
  'Data Validation': <CheckCircle2 className="w-4 h-4" />,
  'Development': <Code2 className="w-4 h-4" />,
  'Dictionaries': <Languages className="w-4 h-4" />,
  'Documents & Productivity': <FileText className="w-4 h-4" />,
  'Email': <Mail className="w-4 h-4" />,
  'Entertainment': <Sparkles className="w-4 h-4" />,
  'Environment': <Globe className="w-4 h-4" />,
  'Events': <Calendar className="w-4 h-4" />,
  'Finance': <TrendingUp className="w-4 h-4" />,
  'Food & Drink': <Utensils className="w-4 h-4" />,
  'Games & Comics': <Gamepad2 className="w-4 h-4" />,
  'Geocoding': <Map className="w-4 h-4" />,
  'Government': <Building2 className="w-4 h-4" />,
  'Health': <HeartPulse className="w-4 h-4" />,
  'Jobs': <Briefcase className="w-4 h-4" />,
  'Machine Learning': <Cpu className="w-4 h-4" />,
  'Music': <Music className="w-4 h-4" />,
  'News': <Newspaper className="w-4 h-4" />,
  'Open Data': <Database className="w-4 h-4" />,
  'Open Source Projects': <Github className="w-4 h-4" />,
  'Patent': <ScrollText className="w-4 h-4" />,
  'Personality': <Heart className="w-4 h-4" />,
  'Phone': <Smartphone className="w-4 h-4" />,
  'Photography': <Image className="w-4 h-4" />,
  'Programming': <Code2 className="w-4 h-4" />,
  'Science & Math': <Microscope className="w-4 h-4" />,
  'Security': <ShieldCheck className="w-4 h-4" />,
  'Shopping': <ShoppingCart className="w-4 h-4" />,
  'Social': <Users className="w-4 h-4" />,
  'Sports & Fitness': <Award className="w-4 h-4" />,
  'Test Data': <TestTube className="w-4 h-4" />,
  'Text Analysis': <FileSearch className="w-4 h-4" />,
  'Tracking': <Package className="w-4 h-4" />,
  'Transportation': <Plane className="w-4 h-4" />,
  'URL Shorteners': <Link2 className="w-4 h-4" />,
  'Vehicle': <Car className="w-4 h-4" />,
  'Video': <Film className="w-4 h-4" />,
  'Weather': <Thermometer className="w-4 h-4" />,
  // New Categories
  'Education': <Book className="w-4 h-4" />,
  'Text-to-Speech': <MessageSquare className="w-4 h-4" />,
  'Communication': <Smartphone className="w-4 h-4" />,
  // Fallbacks
  'AI': <Cpu className="w-4 h-4" />,
  'Games': <Gamepad2 className="w-4 h-4" />,
  'Science': <Microscope className="w-4 h-4" />,
  'Dictionary': <Languages className="w-4 h-4" />,
};

export const DEFAULT_ICON = <Library className="w-4 h-4" />;

// Export all icons for use throughout the app
export {
  Search, Filter, ExternalLink, Copy, Mail, Github, Instagram,
  Moon, Sun, Menu, X, CheckCircle2, Rocket, RefreshCw, Library,
  Code2, Globe, Lock, Star, Share2, Info, LayoutGrid, Zap, ShieldCheck,
  Globe2, Monitor, Key, MessageSquare, ArrowRight, ArrowLeft, PawPrint, DollarSign,
  CloudSun, HeartPulse, Cpu, Gamepad2, Database, Music, Camera, Book,
  Video, Map, Languages, Briefcase, Calendar, Cloud, Coins, FileText,
  Plane, Bug, Palette, Shield, Users, TrendingUp, Utensils, Award,
  Microscope, Link2, Car, Film, Thermometer, TestTube, FileSearch,
  Package, Smartphone, Image, ScrollText, Building2, Heart, Sparkles,
  Newspaper, ShoppingCart, Trash2, Download, ChevronDown
};
