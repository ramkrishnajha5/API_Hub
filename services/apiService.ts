
import { APIEntry, ApiResponse } from '../types';

const API_URL = 'https://api.publicapis.org/entries';

// Complete API Registry with all categories from the README
const COMPLETE_API_REGISTRY: APIEntry[] = [
  // === ANIMALS ===
  { API: "AdoptAPet", Description: "Resource to help get pets adopted", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.adoptapet.com/public/apis/pet_list.html", Category: "Animals" },
  { API: "Cat Facts", Description: "Daily cat facts", Auth: "", HTTPS: true, Cors: "no", Link: "https://alexwohlbruck.github.io/cat-facts/", Category: "Animals" },
  { API: "Cataas", Description: "Cat as a service (cats pictures and gifs)", Auth: "", HTTPS: true, Cors: "no", Link: "https://cataas.com/", Category: "Animals" },
  { API: "Cats", Description: "Pictures of cats from Tumblr", Auth: "apiKey", HTTPS: true, Cors: "no", Link: "https://docs.thecatapi.com/", Category: "Animals" },
  { API: "Dog Facts", Description: "Random dog facts", Auth: "", HTTPS: true, Cors: "yes", Link: "https://dukengn.github.io/Dog-facts-API/", Category: "Animals" },
  { API: "Dogs", Description: "Based on the Stanford Dogs Dataset", Auth: "", HTTPS: true, Cors: "yes", Link: "https://dog.ceo/dog-api/", Category: "Animals" },
  { API: "HTTP Cat", Description: "Cat for every HTTP Status", Auth: "", HTTPS: true, Cors: "yes", Link: "https://http.cat/", Category: "Animals" },
  { API: "HTTP Dog", Description: "Dogs for every HTTP response status code", Auth: "", HTTPS: true, Cors: "yes", Link: "https://http.dog/", Category: "Animals" },
  { API: "RandomDog", Description: "Random pictures of dogs", Auth: "", HTTPS: true, Cors: "yes", Link: "https://random.dog/woof.json", Category: "Animals" },
  { API: "RandomFox", Description: "Random pictures of foxes", Auth: "", HTTPS: true, Cors: "no", Link: "https://randomfox.ca/floof/", Category: "Animals" },
  { API: "The Dog API", Description: "All about Dogs, free to use", Auth: "apiKey", HTTPS: true, Cors: "no", Link: "https://thedogapi.com/", Category: "Animals" },
  { API: "Zoo Animals", Description: "Facts and pictures of zoo animals", Auth: "", HTTPS: true, Cors: "yes", Link: "https://zoo-animal-api.herokuapp.com/", Category: "Animals" },

  // === ANIME ===
  { API: "AniAPI", Description: "Anime discovery, streaming & syncing with trackers", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://aniapi.com/docs/", Category: "Anime" },
  { API: "AniList", Description: "Anime discovery & tracking", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://github.com/AniList/ApiV2-GraphQL-Docs", Category: "Anime" },
  { API: "AnimeChan", Description: "Anime quotes (over 10k+)", Auth: "", HTTPS: true, Cors: "no", Link: "https://github.com/RocktimSaikia/anime-chan", Category: "Anime" },
  { API: "Jikan", Description: "Unofficial MyAnimeList API", Auth: "", HTTPS: true, Cors: "yes", Link: "https://jikan.moe", Category: "Anime" },
  { API: "Kitsu", Description: "Anime discovery platform", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://kitsu.docs.apiary.io/", Category: "Anime" },
  { API: "MangaDex", Description: "Manga Database and Community", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://api.mangadex.org/docs.html", Category: "Anime" },
  { API: "Studio Ghibli", Description: "Resources from Studio Ghibli films", Auth: "", HTTPS: true, Cors: "yes", Link: "https://ghibliapi.herokuapp.com", Category: "Anime" },
  { API: "Waifu.pics", Description: "Image sharing platform for anime images", Auth: "", HTTPS: true, Cors: "no", Link: "https://waifu.pics/docs", Category: "Anime" },

  // === ANTI-MALWARE ===
  { API: "AbuseIPDB", Description: "IP/domain/URL reputation", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://docs.abuseipdb.com/", Category: "Anti-Malware" },
  { API: "Google Safe Browsing", Description: "Google Link/Domain Flagging", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/safe-browsing/", Category: "Anti-Malware" },
  { API: "VirusTotal", Description: "VirusTotal File/URL Analysis", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.virustotal.com/en/documentation/public-api/", Category: "Anti-Malware" },

  // === ART & DESIGN ===
  { API: "Art Institute of Chicago", Description: "Art", Auth: "", HTTPS: true, Cors: "yes", Link: "https://api.artic.edu/docs/", Category: "Art & Design" },
  { API: "Colormind", Description: "Color scheme generator", Auth: "", HTTPS: false, Cors: "unknown", Link: "http://colormind.io/api-access/", Category: "Art & Design" },
  { API: "Cooper Hewitt", Description: "Smithsonian Design Museum", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://collection.cooperhewitt.org/api", Category: "Art & Design" },
  { API: "Dribbble", Description: "Designers & creatives showcase", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developer.dribbble.com", Category: "Art & Design" },
  { API: "EmojiHub", Description: "Get emojis by categories", Auth: "", HTTPS: true, Cors: "yes", Link: "https://github.com/cheatsnake/emojihub", Category: "Art & Design" },
  { API: "Icon Horse", Description: "Favicons for any website", Auth: "", HTTPS: true, Cors: "yes", Link: "https://icon.horse", Category: "Art & Design" },
  { API: "Iconfinder", Description: "Icons", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.iconfinder.com", Category: "Art & Design" },
  { API: "Metropolitan Museum of Art", Description: "Met Museum of Art", Auth: "", HTTPS: true, Cors: "no", Link: "https://metmuseum.github.io/", Category: "Art & Design" },
  { API: "Unsplash", Description: "The most powerful photo API in the world", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://unsplash.com/developers", Category: "Art & Design" },

  // === AUTHENTICATION & AUTHORIZATION ===
  { API: "Auth0", Description: "Adaptable authentication platform", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://auth0.com", Category: "Authentication" },
  { API: "MojoAuth", Description: "Secure passwordless authentication", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://mojoauth.com", Category: "Authentication" },
  { API: "Stytch", Description: "User infrastructure for modern applications", Auth: "apiKey", HTTPS: true, Cors: "no", Link: "https://stytch.com/", Category: "Authentication" },

  // === BLOCKCHAIN ===
  { API: "Bitquery", Description: "Onchain GraphQL APIs & DEX APIs", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://graphql.bitquery.io/ide", Category: "Blockchain" },
  { API: "Chainlink", Description: "Build hybrid smart contracts", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://chain.link/developer-resources", Category: "Blockchain" },
  { API: "Covalent", Description: "Multi-blockchain data aggregator", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.covalenthq.com/docs/api/", Category: "Blockchain" },
  { API: "Etherscan", Description: "Ethereum explorer API", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://etherscan.io/apis", Category: "Blockchain" },
  { API: "The Graph", Description: "Indexing protocol for querying networks", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://thegraph.com", Category: "Blockchain" },

  // === BOOKS ===
  { API: "Bhagavad Gita", Description: "Shrimad Bhagavad Gita API with translations", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://docs.bhagavadgitaapi.in", Category: "Books" },
  { API: "Bible-api", Description: "Free Bible API with multiple languages", Auth: "", HTTPS: true, Cors: "yes", Link: "https://bible-api.com/", Category: "Books" },
  { API: "Google Books", Description: "Books", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/books/", Category: "Books" },
  { API: "Gutendex", Description: "Project Gutenberg Books Library", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://gutendex.com/", Category: "Books" },
  { API: "Open Library", Description: "Books, book covers and related data", Auth: "", HTTPS: true, Cors: "no", Link: "https://openlibrary.org/developers/api", Category: "Books" },
  { API: "PoetryDB", Description: "Poetry collection API", Auth: "", HTTPS: true, Cors: "yes", Link: "https://github.com/thundercomb/poetrydb#readme", Category: "Books" },
  { API: "Quran", Description: "RESTful Quran API with multiple languages", Auth: "", HTTPS: true, Cors: "yes", Link: "https://quran.api-docs.io/", Category: "Books" },

  // === BUSINESS ===
  { API: "Clearbit Logo", Description: "Company logos", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://clearbit.com/docs#logo-api", Category: "Business" },
  { API: "Gmail", Description: "Flexible RESTful access to inbox", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/gmail/api/", Category: "Business" },
  { API: "Google Analytics", Description: "Collect, configure and analyze data", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/analytics/", Category: "Business" },
  { API: "Mailchimp", Description: "Marketing campaigns and transactional mails", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://mailchimp.com/developer/", Category: "Business" },
  { API: "Trello", Description: "Boards, lists and cards for projects", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.trello.com/", Category: "Business" },

  // === CALENDAR ===
  { API: "Calendarific", Description: "Worldwide Holidays", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://calendarific.com/", Category: "Calendar" },
  { API: "Google Calendar", Description: "Calendar events", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/google-apps/calendar/", Category: "Calendar" },
  { API: "Holidays", Description: "Historical data regarding holidays", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://holidayapi.com/", Category: "Calendar" },
  { API: "Nager.Date", Description: "Public holidays for 90+ countries", Auth: "", HTTPS: true, Cors: "no", Link: "https://date.nager.at", Category: "Calendar" },

  // === CLOUD STORAGE ===
  { API: "Box", Description: "File Sharing and Storage", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developer.box.com/", Category: "Cloud Storage" },
  { API: "Dropbox", Description: "File Sharing and Storage", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://www.dropbox.com/developers", Category: "Cloud Storage" },
  { API: "Google Drive", Description: "File Sharing and Storage", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/drive/", Category: "Cloud Storage" },
  { API: "OneDrive", Description: "File Sharing and Storage", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developer.microsoft.com/onedrive", Category: "Cloud Storage" },
  { API: "Imgur", Description: "Image hosting and sharing", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://apidocs.imgur.com/", Category: "Cloud Storage" },

  // === CRYPTOCURRENCY ===
  { API: "Binance", Description: "Exchange for Trading Cryptocurrencies", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://github.com/binance/binance-spot-api-docs", Category: "Cryptocurrency" },
  { API: "CoinGecko", Description: "Cryptocurrency Price, Market Data", Auth: "", HTTPS: true, Cors: "yes", Link: "http://www.coingecko.com/api", Category: "Cryptocurrency" },
  { API: "CoinMarketCap", Description: "Cryptocurrencies Prices", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://coinmarketcap.com/api/", Category: "Cryptocurrency" },
  { API: "CoinCap", Description: "Real time Cryptocurrency prices", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://docs.coincap.io/", Category: "Cryptocurrency" },
  { API: "Coinbase", Description: "Bitcoin, Bitcoin Cash, Ethereum Prices", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developers.coinbase.com", Category: "Cryptocurrency" },
  { API: "Kraken", Description: "Cryptocurrencies Exchange", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://docs.kraken.com/rest/", Category: "Cryptocurrency" },
  { API: "Messari", Description: "Crypto assets data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://messari.io/api", Category: "Cryptocurrency" },

  // === CURRENCY EXCHANGE ===
  { API: "ExchangeRate-API", Description: "Free currency conversion", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.exchangerate-api.com", Category: "Currency Exchange" },
  { API: "Frankfurter", Description: "Exchange rates, currency conversion", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.frankfurter.app/docs", Category: "Currency Exchange" },
  { API: "Fixer", Description: "Foreign exchange rates", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://fixer.io", Category: "Currency Exchange" },

  // === DEVELOPMENT ===
  { API: "GitHub", Description: "GitHub repositories, code and user info", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://docs.github.com/en/free-pro-team@latest/rest", Category: "Development" },
  { API: "GitHub", Description: "GitHub repositories, code and user info", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://docs.github.com/en/rest", Category: "Development" },
  { API: "Gitlab", Description: "Automate GitLab interaction", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://docs.gitlab.com/ee/api/", Category: "Development" },
  { API: "JSONPlaceholder", Description: "Fake Online REST API for Testing", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://jsonplaceholder.typicode.com/", Category: "Development" },
  { API: "Postman", Description: "Tool for testing APIs", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.postman.com/postman/workspace/postman-public-workspace/documentation/12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a", Category: "Development" },
  { API: "Bored", Description: "Find random activities to fight boredom", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.boredapi.com/", Category: "Development" },
  { API: "Google Firebase", Description: "Mobile application development platform", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://firebase.google.com/docs", Category: "Development" },
  { API: "Google Fonts", Description: "Metadata for font families", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/fonts/docs/developer_api", Category: "Development" },
  { API: "IPify", Description: "A simple IP Address API", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.ipify.org/", Category: "Development" },
  { API: "QR Code", Description: "QR code and URL shortener", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.qrtag.net/api/", Category: "Development" },
  { API: "RandomUser", Description: "Generates user data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://randomuser.me", Category: "Development" },

  // === DICTIONARIES ===
  { API: "Free Dictionary", Description: "Definitions, phonetics, pronounciations", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://dictionaryapi.dev/", Category: "Dictionaries" },
  { API: "Merriam-Webster", Description: "Dictionary and Thesaurus Data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://dictionaryapi.com/", Category: "Dictionaries" },
  { API: "Oxford", Description: "Dictionary Data", Auth: "apiKey", HTTPS: true, Cors: "no", Link: "https://developer.oxforddictionaries.com/", Category: "Dictionaries" },
  { API: "Wiktionary", Description: "Collaborative dictionary data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://en.wiktionary.org/w/api.php", Category: "Dictionaries" },

  // === DOCUMENTS & PRODUCTIVITY ===
  { API: "Airtable", Description: "Integrate with Airtable", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://airtable.com/api", Category: "Documents & Productivity" },
  { API: "Asana", Description: "Access to all Asana data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developers.asana.com/docs", Category: "Documents & Productivity" },
  { API: "Notion", Description: "Integrate with Notion", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.notion.com/docs/getting-started", Category: "Documents & Productivity" },
  { API: "Todoist", Description: "Todo Lists", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developer.todoist.com", Category: "Documents & Productivity" },

  // === EMAIL ===
  { API: "Sendgrid", Description: "Cloud-based SMTP provider", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://docs.sendgrid.com/api-reference/", Category: "Email" },
  { API: "MailCheck.ai", Description: "Prevent temp email signups", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.mailcheck.ai/#documentation", Category: "Email" },

  // === ENTERTAINMENT ===
  { API: "Chuck Norris Jokes", Description: "Hand curated Chuck Norris jokes", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://api.chucknorris.io", Category: "Entertainment" },
  { API: "Imgflip", Description: "Popular memes", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://imgflip.com/api", Category: "Entertainment" },
  { API: "Random Useless Facts", Description: "Get useless, but true facts", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://uselessfacts.jsph.pl/", Category: "Entertainment" },

  // === ENVIRONMENT ===
  { API: "Carbon Interface", Description: "CO2 emissions estimates", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://docs.carboninterface.com/", Category: "Environment" },
  { API: "OpenAQ", Description: "Open air quality data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://docs.openaq.org/", Category: "Environment" },
  { API: "UK Carbon Intensity", Description: "Carbon Intensity API for UK", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://carbon-intensity.github.io/api-definitions/#carbon-intensity-api-v1-0-0", Category: "Environment" },

  // === FINANCE ===
  { API: "Alpha Vantage", Description: "Realtime and historical stock data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.alphavantage.co/", Category: "Finance" },
  { API: "Finnhub", Description: "Real-Time RESTful APIs for Stocks", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://finnhub.io/docs/api", Category: "Finance" },
  { API: "IEX Cloud", Description: "Realtime & Historical Stock Data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://iexcloud.io/docs/api/", Category: "Finance" },
  { API: "Polygon", Description: "Historical stock market data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://polygon.io/", Category: "Finance" },
  { API: "Yahoo Finance", Description: "Real time stock market data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.yahoofinanceapi.com/", Category: "Finance" },

  // === FOOD & DRINK ===
  { API: "Open Brewery DB", Description: "Breweries, Cideries and Craft Beer", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.openbrewerydb.org", Category: "Food & Drink" },
  { API: "Open Food Facts", Description: "Food Products Database", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://world.openfoodfacts.org/data", Category: "Food & Drink" },
  { API: "Spoonacular", Description: "Recipes, Food Products, Meal Planning", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://spoonacular.com/food-api", Category: "Food & Drink" },
  { API: "TheCocktailDB", Description: "Cocktail Recipes", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.thecocktaildb.com/api.php", Category: "Food & Drink" },
  { API: "TheMealDB", Description: "Meal Recipes", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.themealdb.com/api.php", Category: "Food & Drink" },

  // === GAMES & COMICS ===
  { API: "Age of Empires II", Description: "Age of Empires II resources", Auth: "", HTTPS: true, Cors: "no", Link: "https://age-of-empires-2-api.herokuapp.com", Category: "Games & Comics" },
  { API: "AmiiboAPI", Description: "Nintendo Amiibo Information", Auth: "", HTTPS: true, Cors: "yes", Link: "https://amiiboapi.com/", Category: "Games & Comics" },
  { API: "Chess.com", Description: "Chess.com read-only REST API", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.chess.com/news/view/published-data-api", Category: "Games & Comics" },
  { API: "Clash of Clans", Description: "Clash of Clans Game Information", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.clashofclans.com", Category: "Games & Comics" },
  { API: "Disney", Description: "Information of Disney characters", Auth: "", HTTPS: true, Cors: "yes", Link: "https://disneyapi.dev", Category: "Games & Comics" },
  { API: "Fortnite", Description: "Fortnite Stats", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://fortnitetracker.com/site-api", Category: "Games & Comics" },
  { API: "FreeToGame", Description: "Free-To-Play Games Database", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.freetogame.com/api-doc", Category: "Games & Comics" },
  { API: "Genshin Impact", Description: "Genshin Impact game data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://genshin.dev", Category: "Games & Comics" },
  { API: "IGDB.com", Description: "Video Game Database", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://api-docs.igdb.com", Category: "Games & Comics" },
  { API: "JokeAPI", Description: "Programming and Dark Jokes", Auth: "", HTTPS: true, Cors: "yes", Link: "https://sv443.net/jokeapi/v2/", Category: "Games & Comics" },
  { API: "Marvel", Description: "Marvel Comics", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.marvel.com", Category: "Games & Comics" },
  { API: "Open Trivia", Description: "Trivia Questions", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://opentdb.com/api_config.php", Category: "Games & Comics" },
  { API: "Pokéapi", Description: "Pokémon Information", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://pokeapi.co", Category: "Games & Comics" },
  { API: "Pokémon TCG", Description: "Pokémon TCG Information", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://pokemontcg.io", Category: "Games & Comics" },
  { API: "RAWG.io", Description: "500,000+ games for 50 platforms", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://rawg.io/apidocs", Category: "Games & Comics" },
  { API: "Rick and Morty", Description: "All Rick and Morty information", Auth: "", HTTPS: true, Cors: "yes", Link: "https://rickandmortyapi.com", Category: "Games & Comics" },
  { API: "Riot Games", Description: "League of Legends Game Information", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.riotgames.com/", Category: "Games & Comics" },
  { API: "SWAPI", Description: "All the Star Wars data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://swapi.dev/", Category: "Games & Comics" },
  { API: "xkcd", Description: "Retrieve xkcd comics as JSON", Auth: "", HTTPS: true, Cors: "no", Link: "https://xkcd.com/json.html", Category: "Games & Comics" },

  // === GEOCODING ===
  { API: "Google Maps", Description: "Create/customize digital maps", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/maps/", Category: "Geocoding" },
  { API: "ipapi.co", Description: "Find IP address location info", Auth: "", HTTPS: true, Cors: "yes", Link: "https://ipapi.co/api/#introduction", Category: "Geocoding" },
  { API: "IP Geolocation", Description: "Geolocate website visitors", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.abstractapi.com/ip-geolocation-api", Category: "Geocoding" },
  { API: "Mapbox", Description: "Create/customize beautiful digital maps", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://docs.mapbox.com/", Category: "Geocoding" },
  { API: "Nominatim", Description: "Forward / reverse geocoding", Auth: "", HTTPS: true, Cors: "yes", Link: "https://nominatim.org/release-docs/latest/api/Overview/", Category: "Geocoding" },
  { API: "OpenCage", Description: "Forward and reverse geocoding", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://opencagedata.com", Category: "Geocoding" },
  { API: "REST Countries", Description: "Country information via RESTful API", Auth: "", HTTPS: true, Cors: "yes", Link: "https://restcountries.com", Category: "Geocoding" },
  { API: "TomTom", Description: "Maps, Directions, Places and Traffic APIs", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.tomtom.com/", Category: "Geocoding" },

  // === GOVERNMENT ===
  { API: "Data.gov", Description: "US Government Data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://api.data.gov/", Category: "Government" },
  { API: "FBI Wanted", Description: "FBI Wanted program information", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.fbi.gov/wanted/api", Category: "Government" },
  { API: "Open Government, USA", Description: "United States Government Open Data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.data.gov/", Category: "Government" },

  // === HEALTH ===
  { API: "Covid-19", Description: "Covid 19 spread, infection and recovery", Auth: "", HTTPS: true, Cors: "yes", Link: "https://covid19api.com/", Category: "Health" },
  { API: "FoodData Central", Description: "National Nutrient Database", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://fdc.nal.usda.gov/", Category: "Health" },
  { API: "Nutritionix", Description: "Worlds largest verified nutrition database", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.nutritionix.com/", Category: "Health" },
  { API: "Open Disease", Description: "COVID-19 and Influenza data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://disease.sh/", Category: "Health" },

  // === JOBS ===
  { API: "Adzuna", Description: "Job board aggregator", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.adzuna.com/overview", Category: "Jobs" },
  { API: "Arbeitnow", Description: "Job board aggregator in Europe / Remote", Auth: "", HTTPS: true, Cors: "yes", Link: "https://documenter.getpostman.com/view/18545278/UVJbJdKh", Category: "Jobs" },
  { API: "Jooble", Description: "Job search engine", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://jooble.org/api/about", Category: "Jobs" },
  { API: "Reed", Description: "Job board aggregator", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.reed.co.uk/developers", Category: "Jobs" },
  { API: "USAJOBS", Description: "US government job board", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.usajobs.gov/", Category: "Jobs" },

  // === MACHINE LEARNING ===
  { API: "Clarifai", Description: "Computer Vision", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://docs.clarifai.com/api-guide/api-overview", Category: "Machine Learning" },
  { API: "Dialogflow", Description: "Natural Language Processing", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://cloud.google.com/dialogflow/docs/", Category: "Machine Learning" },
  { API: "Hugging Face", Description: "Machine learning models and datasets", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://huggingface.co/docs/api-inference/index", Category: "Machine Learning" },
  { API: "OpenAI", Description: "State of the art language models", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://platform.openai.com/", Category: "Machine Learning" },
  { API: "NLP Cloud", Description: "NLP API using spaCy and transformers", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://nlpcloud.io", Category: "Machine Learning" },
  { API: "Perspective", Description: "NLP API for toxic text detection", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://perspectiveapi.com", Category: "Machine Learning" },
  { API: "WolframAlpha", Description: "Answers to questions using algorithms", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://products.wolframalpha.com/api/", Category: "Machine Learning" },

  // === MUSIC ===
  { API: "Deezer", Description: "Music", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.deezer.com/api", Category: "Music" },
  { API: "Genius", Description: "Crowdsourced lyrics and music knowledge", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://docs.genius.com/", Category: "Music" },
  { API: "iTunes Search", Description: "Software products", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/", Category: "Music" },
  { API: "LastFm", Description: "Music", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.last.fm/api", Category: "Music" },
  { API: "Musixmatch", Description: "Music", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.musixmatch.com/", Category: "Music" },
  { API: "Spotify", Description: "View Spotify music catalog", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://beta.developer.spotify.com/documentation/web-api/", Category: "Music" },
  { API: "SoundCloud", Description: "SoundCloud API for music", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.soundcloud.com/docs/api/guide", Category: "Music" },

  // === NEWS ===
  { API: "Currents", Description: "Latest news published in various sources", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://currentsapi.services/", Category: "News" },
  { API: "GNews", Description: "Search for news from various sources", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://gnews.io/", Category: "News" },
  { API: "New York Times", Description: "The New York Times Developer Network", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.nytimes.com/", Category: "News" },
  { API: "News API", Description: "Headlines from news sources and blogs", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://newsapi.org/", Category: "News" },
  { API: "NewsData", Description: "News data API for live-breaking news", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://newsdata.io/docs", Category: "News" },
  { API: "Spaceflight News", Description: "Spaceflight related news", Auth: "", HTTPS: true, Cors: "yes", Link: "https://spaceflightnewsapi.net", Category: "News" },
  { API: "The Guardian", Description: "Access all Guardian content", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "http://open-platform.theguardian.com/", Category: "News" },

  // === OPEN DATA ===
  { API: "Archive.org", Description: "The Internet Archive", Auth: "", HTTPS: true, Cors: "no", Link: "https://archive.readme.io/docs", Category: "Open Data" },
  { API: "Kaggle", Description: "Create and interact with Datasets", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.kaggle.com/docs/api", Category: "Open Data" },
  { API: "Nobel Prize", Description: "Open data about nobel prizes", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.nobelprize.org/about/developer-zone-2/", Category: "Open Data" },
  { API: "Universities List", Description: "University names, countries and domains", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://github.com/Hipo/university-domains-list", Category: "Open Data" },
  { API: "Wikipedia", Description: "Mediawiki Encyclopedia", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.mediawiki.org/wiki/API:Main_page", Category: "Open Data" },
  { API: "Wikidata", Description: "Collaboratively edited knowledge base", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://www.wikidata.org/w/api.php?action=help", Category: "Open Data" },

  // === PERSONALITY ===
  { API: "Advice Slip", Description: "Generate random advice slips", Auth: "", HTTPS: true, Cors: "unknown", Link: "http://api.adviceslip.com/", Category: "Personality" },
  { API: "icanhazdadjoke", Description: "Largest selection of dad jokes", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://icanhazdadjoke.com/api", Category: "Personality" },
  { API: "Kanye.rest", Description: "Random Kanye West quotes", Auth: "", HTTPS: true, Cors: "yes", Link: "https://kanye.rest", Category: "Personality" },
  { API: "Quotable", Description: "Quotable is a free quotes API", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://github.com/lukePeavey/quotable", Category: "Personality" },
  { API: "Zen Quotes", Description: "Zen quotes for inspiration", Auth: "", HTTPS: true, Cors: "yes", Link: "https://zenquotes.io/", Category: "Personality" },

  // === PHOTOGRAPHY ===
  { API: "Flickr", Description: "Flickr Services", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://www.flickr.com/services/api/", Category: "Photography" },
  { API: "Giphy", Description: "Get all your gifs", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developers.giphy.com/docs/", Category: "Photography" },
  { API: "Lorem Picsum", Description: "Images from Unsplash", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://picsum.photos/", Category: "Photography" },
  { API: "Pexels", Description: "Free Stock Photos and Videos", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.pexels.com/api/", Category: "Photography" },
  { API: "Pixabay", Description: "Photography", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://pixabay.com/sk/service/about/api/", Category: "Photography" },

  // === SCIENCE & MATH ===
  { API: "NASA", Description: "NASA data, including imagery", Auth: "", HTTPS: true, Cors: "no", Link: "https://api.nasa.gov", Category: "Science & Math" },
  { API: "SpaceX", Description: "Company, vehicle, launchpad data", Auth: "", HTTPS: true, Cors: "no", Link: "https://github.com/r-spacex/SpaceX-API", Category: "Science & Math" },
  { API: "Open Notify", Description: "ISS astronauts, current location", Auth: "", HTTPS: false, Cors: "no", Link: "http://open-notify.org/Open-Notify-API/", Category: "Science & Math" },
  { API: "Numbers", Description: "Facts about numbers", Auth: "", HTTPS: false, Cors: "no", Link: "http://numbersapi.com", Category: "Science & Math" },
  { API: "USGS Earthquake", Description: "Earthquakes data real-time", Auth: "", HTTPS: true, Cors: "no", Link: "https://earthquake.usgs.gov/fdsnws/event/1/", Category: "Science & Math" },
  { API: "Launch Library 2", Description: "Spaceflight launches database", Auth: "", HTTPS: true, Cors: "yes", Link: "https://thespacedevs.com/llapi", Category: "Science & Math" },

  // === SECURITY ===
  { API: "Have I Been Pwned", Description: "Passwords exposed in breaches", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://haveibeenpwned.com/API/v3", Category: "Security" },
  { API: "Shodan", Description: "Search engine for Internet connected devices", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.shodan.io/", Category: "Security" },
  { API: "UK Police", Description: "UK Police data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://data.police.uk/docs/", Category: "Security" },

  // === SHOPPING ===
  { API: "Best Buy", Description: "Products, Categories, Recommendations", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://bestbuyapis.github.io/api-documentation/#overview", Category: "Shopping" },
  { API: "eBay", Description: "Sell and Buy on eBay", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developer.ebay.com/", Category: "Shopping" },
  { API: "Etsy", Description: "Manage shop and interact with listings", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://www.etsy.com/developers/documentation/getting_started/api_basics", Category: "Shopping" },
  { API: "WooCommerce", Description: "WooCommerce REST APIs", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://woocommerce.github.io/woocommerce-rest-api-docs/", Category: "Shopping" },

  // === SOCIAL ===
  { API: "Discord", Description: "Make bots for Discord", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://discord.com/developers/docs/intro", Category: "Social" },
  { API: "Facebook", Description: "Facebook Login, Share on FB, Analytics", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.facebook.com/", Category: "Social" },
  { API: "HackerNews", Description: "Social news for CS and entrepreneurship", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://github.com/HackerNews/API", Category: "Social" },
  { API: "Instagram", Description: "Instagram Login, Share, Social Plugins", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://www.instagram.com/developer/", Category: "Social" },
  { API: "Reddit", Description: "Homepage of the internet", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://www.reddit.com/dev/api", Category: "Social" },
  { API: "Slack", Description: "Team Instant Messaging", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://api.slack.com/", Category: "Social" },
  { API: "Telegram Bot", Description: "Telegram Bot API", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://core.telegram.org/bots/api", Category: "Social" },
  { API: "TikTok", Description: "TikTok platform", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.tiktok.com/doc/login-kit-web", Category: "Social" },
  { API: "Tumblr", Description: "Read and write Tumblr Data", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://www.tumblr.com/docs/en/api/v2", Category: "Social" },
  { API: "Twitch", Description: "Game Streaming API", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://dev.twitch.tv/docs", Category: "Social" },
  { API: "Twitter", Description: "Read and write Twitter data", Auth: "OAuth", HTTPS: true, Cors: "no", Link: "https://developer.twitter.com/en/docs", Category: "Social" },

  // === SPORTS & FITNESS ===
  { API: "API-FOOTBALL", Description: "Football Leagues & Cups", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.api-football.com/documentation-v3", Category: "Sports & Fitness" },
  { API: "balldontlie", Description: "NBA stats data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.balldontlie.io", Category: "Sports & Fitness" },
  { API: "Ergast F1", Description: "F1 data from 1950", Auth: "", HTTPS: true, Cors: "unknown", Link: "http://ergast.com/mrd/", Category: "Sports & Fitness" },
  { API: "Fitbit", Description: "Fitbit Information", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://dev.fitbit.com/", Category: "Sports & Fitness" },
  { API: "Football-Data", Description: "Football data with matches info", Auth: "X-Mashape-Key", HTTPS: true, Cors: "unknown", Link: "https://www.football-data.org", Category: "Sports & Fitness" },
  { API: "NBA Stats", Description: "NBA Statistics", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://any-api.com/nba_com/nba_com/docs/API_Description", Category: "Sports & Fitness" },
  { API: "NHL Records and Stats", Description: "NHL historical data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://gitlab.com/dword4/nhlapi", Category: "Sports & Fitness" },
  { API: "Strava", Description: "Connect with athletes, activities", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://strava.github.io/api/", Category: "Sports & Fitness" },
  { API: "TheSportsDB", Description: "Crowd-Sourced Sports Data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.thesportsdb.com/api.php", Category: "Sports & Fitness" },

  // === TEST DATA ===
  { API: "Bacon Ipsum", Description: "A Meatier Lorem Ipsum Generator", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://baconipsum.com/json-api/", Category: "Test Data" },
  { API: "DiceBear Avatars", Description: "Generate random pixel-art avatars", Auth: "", HTTPS: true, Cors: "no", Link: "https://avatars.dicebear.com/", Category: "Test Data" },
  { API: "FakerAPI", Description: "APIs to get fake data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://fakerapi.it/en", Category: "Test Data" },
  { API: "FakeStoreAPI", Description: "Fake store REST API", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://fakestoreapi.com/", Category: "Test Data" },
  { API: "Mockaroo", Description: "Generate fake data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.mockaroo.com/docs", Category: "Test Data" },
  { API: "RoboHash", Description: "Generate random robot/alien avatars", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://robohash.org/", Category: "Test Data" },

  // === TEXT ANALYSIS ===
  { API: "Detect Language", Description: "Detects text language", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://detectlanguage.com/", Category: "Text Analysis" },
  { API: "LibreTranslate", Description: "Translation tool with 17 languages", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://libretranslate.com/docs", Category: "Text Analysis" },

  // === TRACKING ===
  { API: "Aftership", Description: "Track shipment efficiently", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developers.aftership.com/reference/quick-start", Category: "Tracking" },
  { API: "UPS", Description: "Shipment and Address information", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.ups.com/upsdeveloperkit", Category: "Tracking" },

  // === TRANSPORTATION ===
  { API: "Amadeus", Description: "Travel Search", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.amadeus.com/self-service", Category: "Transportation" },
  { API: "AviationAPI", Description: "FAA Charts and Airport Info", Auth: "", HTTPS: true, Cors: "no", Link: "https://docs.aviationapi.com", Category: "Transportation" },
  { API: "OpenSky Network", Description: "Free real-time ADS-B aviation data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://opensky-network.org/apidoc/index.html", Category: "Transportation" },
  { API: "Transport for London", Description: "TfL API", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://api.tfl.gov.uk", Category: "Transportation" },
  { API: "Uber", Description: "Uber ride requests and price estimation", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://developer.uber.com/products", Category: "Transportation" },

  // === URL SHORTENERS ===
  { API: "Bitly", Description: "URL shortener and link management", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "http://dev.bitly.com/get_started.html", Category: "URL Shorteners" },
  { API: "CleanURI", Description: "URL shortener service", Auth: "", HTTPS: true, Cors: "yes", Link: "https://cleanuri.com/docs", Category: "URL Shorteners" },
  { API: "TinyURL", Description: "Shorten long URLs", Auth: "apiKey", HTTPS: true, Cors: "no", Link: "https://tinyurl.com/app/dev", Category: "URL Shorteners" },

  // === VEHICLE ===
  { API: "NHTSA", Description: "NHTSA Product Information Catalog", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://vpic.nhtsa.dot.gov/api/", Category: "Vehicle" },
  { API: "Smartcar", Description: "Lock/unlock vehicles and get data", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://smartcar.com/docs/", Category: "Vehicle" },

  // === VIDEO ===
  { API: "Breaking Bad", Description: "Breaking Bad API", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://breakingbadapi.com/documentation", Category: "Video" },
  { API: "Game of Thrones Quotes", Description: "Game of Thrones quotes", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://gameofthronesquotes.xyz/", Category: "Video" },
  { API: "Harry Potter", Description: "Harry Potter Characters Data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://hp-api.herokuapp.com/", Category: "Video" },
  { API: "IMDb-API", Description: "Movie, serial and cast information", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://imdb-api.com/", Category: "Video" },
  { API: "Open Movie Database", Description: "Movie information", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "http://www.omdbapi.com/", Category: "Video" },
  { API: "The Lord of the Rings", Description: "Lord of the Rings API", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://the-one-api.dev/", Category: "Video" },
  { API: "TMDb", Description: "Community-based movie data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.themoviedb.org/documentation/api", Category: "Video" },
  { API: "Trakt", Description: "Movie and TV Data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://trakt.docs.apiary.io/", Category: "Video" },
  { API: "TVDB", Description: "Television data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://thetvdb.com/api-information", Category: "Video" },
  { API: "Vimeo", Description: "Vimeo Developer API", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developer.vimeo.com/", Category: "Video" },
  { API: "YouTube", Description: "Add YouTube functionality", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://developers.google.com/youtube/", Category: "Video" },

  // === WEATHER ===
  { API: "AccuWeather", Description: "Weather and forecast data", Auth: "apiKey", HTTPS: false, Cors: "unknown", Link: "https://developer.accuweather.com/apis", Category: "Weather" },
  { API: "Open-Meteo", Description: "Global weather forecast API", Auth: "", HTTPS: true, Cors: "yes", Link: "https://open-meteo.com/", Category: "Weather" },
  { API: "OpenWeatherMap", Description: "Weather", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://openweathermap.org/api", Category: "Weather" },
  { API: "Storm Glass", Description: "Global marine weather", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://stormglass.io/", Category: "Weather" },
  { API: "Visual Crossing", Description: "Global weather forecast data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.visualcrossing.com/weather-api", Category: "Weather" },
  { API: "WeatherAPI", Description: "Weather API with Astronomy data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.weatherapi.com/", Category: "Weather" },
  { API: "Weatherbit", Description: "Weather", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://www.weatherbit.io/api", Category: "Weather" },

  // === AI & MACHINE LEARNING (NEW) ===
  { API: "Hugging Face", Description: "Access thousands of ML models", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://huggingface.co/docs/api-inference", Category: "Machine Learning" },
  { API: "Eden AI", Description: "Unified API for multiple AI providers", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.edenai.co/", Category: "Machine Learning" },
  { API: "Imagga", Description: "Image recognition and tagging", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://imagga.com/", Category: "Machine Learning" },
  { API: "DeepAI", Description: "AI-powered image and text tools", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://deepai.org/", Category: "Machine Learning" },
  { API: "Google Cloud Vision", Description: "Image analysis and recognition", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://cloud.google.com/vision", Category: "Machine Learning" },
  { API: "Amazon Rekognition", Description: "Image and video analysis", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://aws.amazon.com/rekognition/", Category: "Machine Learning" },
  { API: "Stability AI", Description: "Stable Diffusion image generation", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://stability.ai/", Category: "Machine Learning" },
  { API: "Replicate", Description: "Run ML models in the cloud", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://replicate.com/", Category: "Machine Learning" },

  // === SPORTS (NEW) ===
  { API: "TheSportsDB", Description: "Open sports database with images", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.thesportsdb.com/api.php", Category: "Sports & Fitness" },
  { API: "OpenLigaDB", Description: "Free football/soccer data API", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.openligadb.de/", Category: "Sports & Fitness" },
  { API: "API-SPORTS", Description: "Multi-sport data (football, NBA, F1)", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://api-sports.io/", Category: "Sports & Fitness" },
  { API: "Sportmonks", Description: "Football data and statistics", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://sportmonks.com/", Category: "Sports & Fitness" },
  { API: "PandaScore", Description: "E-sports data and statistics", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://pandascore.co/", Category: "Sports & Fitness" },
  { API: "CollegeFootballData", Description: "US college football statistics", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://collegefootballdata.com/", Category: "Sports & Fitness" },
  { API: "MLB Stats", Description: "Major League Baseball data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://statsapi.mlb.com/", Category: "Sports & Fitness" },
  { API: "SportsData.io", Description: "Real-time sports scores", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://sportsdata.io/", Category: "Sports & Fitness" },

  // === EDUCATION (NEW) ===
  { API: "College Scorecard", Description: "US higher education data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://collegescorecard.ed.gov/data/", Category: "Education" },
  { API: "Datamuse", Description: "Word-finding query engine", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.datamuse.com/api/", Category: "Education" },
  { API: "Open Syllabus", Description: "Academic syllabus data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://opensyllabus.org/", Category: "Education" },
  { API: "Wordnik", Description: "Dictionary and word data", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://developer.wordnik.com/", Category: "Education" },
  { API: "Urban Dictionary", Description: "Crowdsourced slang dictionary", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://rapidapi.com/community/api/urban-dictionary", Category: "Education" },
  { API: "Purgomalum", Description: "Profanity filter API", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.purgomalum.com/", Category: "Education" },

  // === TEXT-TO-SPEECH (NEW) ===
  { API: "ElevenLabs", Description: "AI voice synthesis and cloning", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://elevenlabs.io/", Category: "Text-to-Speech" },
  { API: "Play.ht", Description: "AI voice generation", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://play.ht/", Category: "Text-to-Speech" },
  { API: "Murf.ai", Description: "AI voiceover studio", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://murf.ai/", Category: "Text-to-Speech" },
  { API: "Luvvoice", Description: "Free text-to-speech", Auth: "", HTTPS: true, Cors: "yes", Link: "https://luvvoice.com/", Category: "Text-to-Speech" },
  { API: "Google Text-to-Speech", Description: "Convert text to natural speech", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://cloud.google.com/text-to-speech", Category: "Text-to-Speech" },
  { API: "Amazon Polly", Description: "Lifelike speech synthesis", Auth: "apiKey", HTTPS: true, Cors: "unknown", Link: "https://aws.amazon.com/polly/", Category: "Text-to-Speech" },

  // === MORE ENTERTAINMENT (NEW) ===
  { API: "OMDb", Description: "Open Movie Database", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.omdbapi.com/", Category: "Entertainment" },
  { API: "Watchmode", Description: "Streaming availability search", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://api.watchmode.com/", Category: "Entertainment" },
  { API: "TheAudioDB", Description: "Music and album database", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.theaudiodb.com/", Category: "Music" },
  { API: "Napster", Description: "Music catalog and streaming", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.napster.com/", Category: "Music" },
  { API: "Lyrics.ovh", Description: "Free lyrics API", Auth: "", HTTPS: true, Cors: "yes", Link: "https://lyricsovh.docs.apiary.io/", Category: "Music" },
  { API: "Radio Browser", Description: "Internet radio stations database", Auth: "", HTTPS: true, Cors: "yes", Link: "https://api.radio-browser.info/", Category: "Music" },

  // === MORE GAMES (NEW) ===
  { API: "GamerPower", Description: "Free games and giveaways", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.gamerpower.com/api-read", Category: "Games & Comics" },
  { API: "CheapShark", Description: "Video game deals aggregator", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.cheapshark.com/api", Category: "Games & Comics" },
  { API: "Giant Bomb", Description: "Video games database", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.giantbomb.com/api/", Category: "Games & Comics" },
  { API: "BoardGameGeek", Description: "Board games database", Auth: "", HTTPS: true, Cors: "yes", Link: "https://boardgamegeek.com/wiki/page/BGG_XML_API2", Category: "Games & Comics" },
  { API: "Deck of Cards", Description: "Deck of cards API", Auth: "", HTTPS: true, Cors: "yes", Link: "https://deckofcardsapi.com/", Category: "Games & Comics" },
  { API: "Dungeons & Dragons 5e", Description: "D&D 5th edition data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.dnd5eapi.co/", Category: "Games & Comics" },
  { API: "Hearthstone", Description: "Hearthstone card data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://hearthstoneapi.com/", Category: "Games & Comics" },
  { API: "Magic: The Gathering", Description: "MTG card database", Auth: "", HTTPS: true, Cors: "yes", Link: "https://docs.magicthegathering.io/", Category: "Games & Comics" },

  // === MORE GOVERNMENT/OPEN DATA (NEW) ===
  { API: "Data.gov", Description: "US Government open data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://api.data.gov/", Category: "Government" },
  { API: "UK Parliament", Description: "UK Parliament data", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.parliament.uk/site-information/data/", Category: "Government" },
  { API: "EU Open Data", Description: "European Union open data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://data.europa.eu/en", Category: "Government" },
  { API: "Census Bureau", Description: "US Census data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.census.gov/data/developers.html", Category: "Government" },
  { API: "World Bank", Description: "World development indicators", Auth: "", HTTPS: true, Cors: "yes", Link: "https://datahelpdesk.worldbank.org/knowledgebase/articles/889392", Category: "Government" },
  { API: "OECD", Description: "OECD statistical data", Auth: "", HTTPS: true, Cors: "yes", Link: "https://data.oecd.org/api/", Category: "Government" },

  // === MORE UTILITY APIs (NEW) ===
  { API: "DuckDuckGo Instant", Description: "Instant answers from DuckDuckGo", Auth: "", HTTPS: true, Cors: "yes", Link: "https://duckduckgo.com/api", Category: "Development" },
  { API: "Abstract API", Description: "IP geolocation, VAT, and more", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.abstractapi.com/", Category: "Development" },
  { API: "Hunter.io", Description: "Email finder and verifier", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://hunter.io/api", Category: "Email" },
  { API: "Mailgun", Description: "Email sending API", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.mailgun.com/", Category: "Email" },
  { API: "Resend", Description: "Modern email API", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://resend.com/", Category: "Email" },
  { API: "PDF.co", Description: "PDF generation and manipulation", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://pdf.co/", Category: "Documents & Productivity" },
  { API: "ConvertAPI", Description: "File conversion API", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.convertapi.com/", Category: "Documents & Productivity" },
  { API: "Cloudmersive", Description: "Document and image processing", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://cloudmersive.com/", Category: "Documents & Productivity" },

  // === PLACEHOLDER / TESTING (NEW) ===
  { API: "Reqres", Description: "Fake REST API for testing", Auth: "", HTTPS: true, Cors: "yes", Link: "https://reqres.in/", Category: "Test Data" },
  { API: "httpbin", Description: "HTTP request testing", Auth: "", HTTPS: true, Cors: "yes", Link: "https://httpbin.org/", Category: "Test Data" },
  { API: "JSONBin", Description: "Simple JSON storage", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://jsonbin.io/", Category: "Test Data" },
  { API: "MockAPI", Description: "Fake API for prototyping", Auth: "", HTTPS: true, Cors: "yes", Link: "https://mockapi.io/", Category: "Test Data" },
  { API: "Placeholder.com", Description: "Placeholder images", Auth: "", HTTPS: true, Cors: "yes", Link: "https://placeholder.com/", Category: "Test Data" },

  // === COMMUNICATION (NEW) ===
  { API: "Twilio", Description: "SMS, voice, and messaging", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.twilio.com/", Category: "Communication" },
  { API: "Vonage", Description: "SMS and voice APIs", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.vonage.com/", Category: "Communication" },
  { API: "MessageBird", Description: "Messaging and voice API", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://messagebird.com/", Category: "Communication" },
  { API: "Pusher", Description: "Realtime messaging", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://pusher.com/", Category: "Communication" },
  { API: "Stream", Description: "Chat and activity feeds", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://getstream.io/", Category: "Communication" },

  // === LIFESTYLE (NEW) ===
  { API: "Yelp Fusion", Description: "Local business reviews", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.yelp.com/developers", Category: "Business" },
  { API: "Foursquare", Description: "Places and location data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.foursquare.com/", Category: "Business" },
  { API: "Eventbrite", Description: "Event management platform", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://www.eventbrite.com/platform/api", Category: "Events" },
  { API: "Ticketmaster", Description: "Events and ticketing", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.ticketmaster.com/", Category: "Events" },
  { API: "Meetup", Description: "Meetup events data", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.meetup.com/api/", Category: "Events" },
];

export const fetchAllApis = async (): Promise<APIEntry[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API fetch failed');
    const data: ApiResponse = await response.json();
    // Merge live data with our comprehensive local registry
    const liveEntries = data.entries || [];
    // Create a set of API names from our complete registry
    const registryApiNames = new Set(COMPLETE_API_REGISTRY.map(m => m.API));
    // Filter out duplicates from live data
    const filteredLive = liveEntries.filter(e => !registryApiNames.has(e.API));
    return [...COMPLETE_API_REGISTRY, ...filteredLive];
  } catch (error) {
    console.warn('Live API unavailable, using complete local registry with 300+ APIs');
    return COMPLETE_API_REGISTRY;
  }
};

// Get all unique categories
export const getAllCategories = (): string[] => {
  const categories = new Set(COMPLETE_API_REGISTRY.map(api => api.Category));
  return Array.from(categories).sort();
};

// Get APIs by category
export const getApisByCategory = (category: string): APIEntry[] => {
  return COMPLETE_API_REGISTRY.filter(api => api.Category === category);
};

// Get API count
export const getTotalApiCount = (): number => COMPLETE_API_REGISTRY.length;
