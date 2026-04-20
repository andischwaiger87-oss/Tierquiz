<script lang="ts">
	let userXp = 78;
	let missingXp = 220;
	let collectedSpecies = 12;
	let totalSpecies = 48;
</script>

<main class="pt-24 px-6 md:px-12 max-w-7xl mx-auto pb-32">
	
	<section class="relative mb-16 mt-4">
		<div class="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-xl overflow-hidden group">
			<img alt="Schneeleopard" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1560662241-11b3d047321e?q=80&w=1200&auto=format&fit=crop" />
			<div class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
			
			<div class="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div>
					<span class="inline-block px-4 py-1 rounded-full bg-tertiary-container text-tertiary font-label text-xs font-bold tracking-widest uppercase mb-4">Seltene Art</span>
					<h2 class="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-2 leading-none">Schneeleopard</h2>
					<p class="text-on-surface-variant max-w-md text-lg">Der "Geist der Berge" ist ein absoluter Meister der Tarnung in den rauen Bergen Zentralasiens.</p>
				</div>
				<a href="/lexicon" class="inline-block bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-lg shadow-[0px_20px_40px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform text-center">
	Lebensraum betreten
</a>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<div class="flex items-center justify-between mb-8">
			<h3 class="text-3xl font-bold tracking-tight text-on-surface">Lebensräume</h3>
			<span class="text-primary font-medium cursor-pointer hover:underline">Alle ansehen</span>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="relative group h-80 rounded-md overflow-hidden bg-surface-container-low transition-all duration-500 hover:-translate-y-2 cursor-pointer">
				<img alt="Tiefer Wald" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop" />
				<div class="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-surface-container-lowest to-transparent">
					<h4 class="text-2xl font-bold text-on-surface mb-1">Tiefer Wald</h4>
					<p class="text-on-surface-variant text-sm">1.240 Arten katalogisiert</p>
				</div>
			</div>
			
			<div class="relative group h-80 rounded-md overflow-hidden bg-surface-container-low transition-all duration-500 hover:-translate-y-2 cursor-pointer">
				<img alt="Ozeanische Tiefe" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=800&auto=format&fit=crop" />
				<div class="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-surface-container-lowest to-transparent">
					<h4 class="text-2xl font-bold text-on-surface mb-1">Ozeanische Tiefe</h4>
					<p class="text-on-surface-variant text-sm">856 Arten katalogisiert</p>
				</div>
			</div>

			<div class="relative group h-80 rounded-md overflow-hidden bg-surface-container-low transition-all duration-500 hover:-translate-y-2 cursor-pointer">
				<img alt="Goldener Sand" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop" />
				<div class="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-surface-container-lowest to-transparent">
					<h4 class="text-2xl font-bold text-on-surface mb-1">Goldener Sand</h4>
					<p class="text-on-surface-variant text-sm">412 Arten katalogisiert</p>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<div class="bg-surface-container-high rounded-xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-[0px_20px_40px_rgba(0,0,0,0.1)]">
			<div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
			
			<div class="flex-1 z-10">
				<div class="flex items-center gap-2 mb-4">
					<span class="material-symbols-outlined text-tertiary">psychology</span>
					<span class="text-tertiary font-bold tracking-widest text-xs uppercase">Tägliche Mission</span>
				</div>
				<h3 class="text-4xl font-bold mb-4 tracking-tight text-on-surface">Das Tarnungs-Rätsel</h3>
				<p class="text-on-surface-variant text-lg mb-8 max-w-xl">Kannst du die 5 versteckten Tiere im Amazonasgebiet in unter 60 Sekunden finden? Verdiene 250 Bio-Credits und schalte das "Scharfschützen"-Abzeichen frei.</p>
				
				<div class="flex flex-wrap gap-4">
					<button class="bg-surface-variant/40 border border-outline-variant/15 text-on-surface hover:bg-surface-variant/60 px-6 py-3 rounded-md font-semibold transition-all">Regeln lesen</button>
					<a href="/quest" class="inline-block bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-3 rounded-md font-bold transition-all hover:scale-105 active:scale-95 shadow-[0px_20px_40px_rgba(0,0,0,0.25)]">Quiz starten</a>
				</div>
			</div>
			
			<div class="w-full md:w-1/3 aspect-square bg-surface-container-highest rounded-md flex items-center justify-center p-6 border border-outline-variant/15 relative z-10 overflow-hidden">
				<img alt="Chamäleon Auge" class="w-full h-full object-cover rounded-[1rem] rotate-3 opacity-80" src="https://images.unsplash.com/photo-1541414779316-d56599423097?q=80&w=600&auto=format&fit=crop" />
			</div>
		</div>
	</section>

	<section class="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
		<div class="bg-surface-container-low rounded-md p-8">
			<div class="flex justify-between items-center mb-6">
				<h4 class="text-xl font-bold text-on-surface">Missions-Fortschritt</h4>
				<span class="text-primary text-sm font-bold">{userXp}%</span>
			</div>
			<div class="w-full h-4 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/15">
				<div class="h-full bg-gradient-to-r from-primary-container to-primary rounded-full transition-all duration-1000" style="width: {userXp}%"></div>
			</div>
			<p class="mt-4 text-sm text-on-surface-variant">Du bist nur noch {missingXp} XP vom Rang "Spitzenprädator" entfernt.</p>
		</div>

		<div class="bg-surface-container-low rounded-md p-8">
			<div class="flex justify-between items-center mb-6">
				<h4 class="text-xl font-bold text-on-surface">Sammlungs-Status</h4>
				<span class="text-tertiary text-sm font-bold">{collectedSpecies}/{totalSpecies}</span>
			</div>
			<div class="flex gap-2">
				{#each Array(3) as _}
					<div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center"><span class="material-symbols-outlined text-[16px] text-primary">check</span></div>
				{/each}
				{#each Array(3) as _}
					<div class="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant/30"></div>
				{/each}
			</div>
			<p class="mt-4 text-sm text-on-surface-variant">Erkunde den Dschungel weiter, um die fehlenden Arten zu finden.</p>
		</div>
	</section>
</main>