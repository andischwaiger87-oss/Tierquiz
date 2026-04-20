<script lang="ts">
	import { page } from '$app/stores';
	// Wir prüfen den aktuellen Pfad für die visuelle Hervorhebung
	let currentPath = $derived($page.url.pathname);
</script>

<nav class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
	<div class="bg-surface-variant/60 backdrop-blur-2xl rounded-full px-6 py-3 flex justify-between items-center shadow-[0px_20px_40px_rgba(0,0,0,0.4)] border border-outline-variant/15">
		
		<a href="/" class="flex flex-col items-center justify-center {currentPath === '/' ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 scale-110' : 'text-on-surface-variant hover:text-primary'} rounded-full p-3 active:scale-90 transition-transform duration-300">
			<span class="material-symbols-outlined" style={currentPath === '/' ? "font-variation-settings: 'FILL' 1;" : ""}>eco</span>
			<span class="font-label text-[10px] font-medium uppercase tracking-widest mt-1">Entdecken</span>
		</a>
		
		<a href="/quest" class="flex flex-col items-center justify-center {currentPath.includes('/quest') ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 scale-110' : 'text-on-surface-variant hover:text-primary'} rounded-full p-3 active:scale-90 transition-transform duration-300">
			<span class="material-symbols-outlined" style={currentPath.includes('/quest') ? "font-variation-settings: 'FILL' 1;" : ""}>psychology</span>
			<span class="font-label text-[10px] font-medium uppercase tracking-widest mt-1">Quests</span>
		</a>
		
		<a href="/lexicon" class="flex flex-col items-center justify-center {currentPath.includes('/lexicon') ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 scale-110' : 'text-on-surface-variant hover:text-primary'} rounded-full p-3 active:scale-90 transition-transform duration-300">
			<span class="material-symbols-outlined" style={currentPath.includes('/lexicon') ? "font-variation-settings: 'FILL' 1;" : ""}>auto_stories</span>
			<span class="font-label text-[10px] font-medium uppercase tracking-widest mt-1">Archiv</span>
		</a>
		
		<button class="flex flex-col items-center justify-center text-on-surface-variant p-3 hover:text-primary transition-all active:scale-90 duration-300">
			<span class="material-symbols-outlined">person</span>
			<span class="font-label text-[10px] font-medium uppercase tracking-widest mt-1">Profil</span>
		</button>
	</div>
</nav>