<aside class="sidebar">

   <!-- Logo -->
<div class="logo">
    <img src="assets/images/spotify.png" alt="Spotify Logo" class="logo-img">
</div>
    <!-- Main Navigation -->
    <nav class="nav">

        <a href="index.php" class="active">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>

        <a href="search.php">
            <i class="fas fa-search"></i>
            <span>Search</span>
        </a>

        <a href="favorites.php">
            <i class="fas fa-heart"></i>
            <span>Favorites</span>
        </a>

        <a href="recent.php">
            <i class="fas fa-clock-rotate-left"></i>
            <span>Recently Played</span>
        </a>

    </nav>

    <div class="divider"></div>

    <!-- Your Library -->
    <div class="library">

        <div class="library-title">
            <span>Your Library</span>
            <i class="fas fa-plus"></i>
        </div>

        <div class="library-list">

            <div class="library-item">
                <h4>
                    <i class="fas fa-headphones"></i>
                    Chill Mix
                </h4>
                <p>Playlist • 54 Songs</p>
            </div>

            <div class="library-item">
                <h4>
                    <i class="fas fa-laptop-code"></i>
                    Coding Playlist
                </h4>
                <p>Playlist • 83 Songs</p>
            </div>

            <div class="library-item">
                <h4>
                    <i class="fas fa-fire"></i>
                    Top Hits
                </h4>
                <p>Playlist • 47 Songs</p>
            </div>

            <div class="library-item">
                <h4>
                    <i class="fas fa-moon"></i>
                    Night Drive
                </h4>
                <p>Playlist • 31 Songs</p>
            </div>

        </div>

    </div>

    <div class="divider"></div>

    <!-- Browse -->
    <div class="library">

        <div class="library-title">
            <span>Browse</span>
        </div>

        <div class="library-list">

            <div class="library-item">
                <h4>
                    <i class="fas fa-chart-line"></i>
                    Trending
                </h4>
            </div>

            <div class="library-item">
                <h4>
                    <i class="fas fa-microphone"></i>
                    Artists
                </h4>
            </div>

            <div class="library-item">
                <h4>
                    <i class="fas fa-compact-disc"></i>
                    Albums
                </h4>
            </div>

            <div class="library-item">
                <h4>
                    <i class="fas fa-podcast"></i>
                    Podcasts
                </h4>
            </div>

        </div>

    </div>

    <div style="margin-top:auto; padding-top:20px;">

        <div class="divider"></div>

        <div style="padding-top:20px;">

            <?php if(isset($_SESSION['username'])): ?>

                <div class="library-item">

                    <h4>
                        <i class="fas fa-user-circle"></i>
                        <?= htmlspecialchars($_SESSION['username']); ?>
                    </h4>

                    <p>
                        <i class="fas fa-crown"></i>
                        Premium Member
                    </p>

                </div>

            <?php else: ?>

                <div class="library-item">

                    <h4>
                        <i class="fas fa-user"></i>
                        Guest User
                    </h4>

                    <p>
                        <a href="login.php" style="color:#1DB954;text-decoration:none;">
                            <i class="fas fa-right-to-bracket"></i>
                            Login
                        </a>
                    </p>

                </div>

            <?php endif; ?>

        </div>

    </div>

</aside>
