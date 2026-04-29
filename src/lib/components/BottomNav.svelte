<script lang="ts">
	import { page } from '$app/stores';
	let currentPath = $derived($page.url.pathname);
</script>

<nav class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
	<div class="bg-surface-variant/80 backdrop-blur-2xl rounded-full px-4 py-2 flex justify-between items-center shadow-[0px_10px_30px_rgba(0,0,0,0.5)] border border-outline-variant/20">
		
		<a href="/" class="flex flex-col items-center justify-center {currentPath === '/' ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-md scale-105' : 'text-on-surface-variant hover:text-primary'} rounded-full p-2 active:scale-95 transition-all duration-300 w-16">
			<span class="material-symbols-outlined text-[22px]" style={currentPath === '/' ? "font-variation-settings: 'FILL' 1;" : ""}>eco</span>
			<span class="font-label text-[9px] font-bold uppercase tracking-wider mt-0.5">Entdecken</span>
		</a>
		
		<a href="/quest" class="flex flex-col items-center justify-center {currentPath.includes('/quest') ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-md scale-105' : 'text-on-surface-variant hover:text-primary'} rounded-full p-2 active:scale-95 transition-all duration-300 w-16">
			<span class="material-symbols-outlined text-[22px]" style={currentPath.includes('/quest') ? "font-variation-settings: 'FILL' 1;" : ""}>psychology</span>
			<span class="font-label text-[9px] font-bold uppercase tracking-wider mt-0.5">Quests</span>
		</a>
		
		<a href="/lexicon" class="flex flex-col items-center justify-center {currentPath.includes('/lexicon') ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-md scale-105' : 'text-on-surface-variant hover:text-primary'} rounded-full p-2 active:scale-95 transition-all duration-300 w-16">
			<span class="material-symbols-outlined text-[22px]" style={currentPath.includes('/lexicon') ? "font-variation-settings: 'FILL' 1;" : ""}>auto_stories</span>
			<span class="font-label text-[9px] font-bold uppercase tracking-wider mt-0.5">Archiv</span>
		</a>
		
		<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary transition-all active:scale-95 duration-300 w-16">
			<span class="material-symbols-outlined text-[22px]">person</span>
			<span class="font-label text-[9px] font-bold uppercase tracking-wider mt-0.5">Profil</span>
		</button>
	</div>
</nav>