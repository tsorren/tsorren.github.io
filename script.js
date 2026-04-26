document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleButton = document.getElementById("glitch-toggle");
    const bootScreen = document.getElementById("boot-screen");
    const bootButton = document.getElementById("boot-button");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let glitchEnabled = !reduceMotion;
    let glitchLoopTimeoutId = null;
    let hasStarted = false;

    const setGlitchState = (enabled) => {
        glitchEnabled = enabled;
        body.classList.remove("crt-glitch");

        if (toggleButton) {
            toggleButton.setAttribute("aria-pressed", String(glitchEnabled));
            toggleButton.textContent = glitchEnabled ? "GLITCH: ON" : "GLITCH: OFF";
            toggleButton.classList.toggle("is-off", !glitchEnabled);
        }
    };

    const runGlitchBurst = () => {
        if (!glitchEnabled) {
            return;
        }

        body.classList.add("crt-glitch");
        window.setTimeout(() => {
            body.classList.remove("crt-glitch");
        }, 140);

        window.setTimeout(() => {
            if (!glitchEnabled) {
                return;
            }

            body.classList.add("crt-glitch");
            window.setTimeout(() => {
                body.classList.remove("crt-glitch");
            }, 70);
        }, 210);
    };

    const scheduleNextGlitch = () => {
        if (glitchLoopTimeoutId) {
            window.clearTimeout(glitchLoopTimeoutId);
        }

        if (!glitchEnabled) {
            return;
        }

        const nextDelayMs = 1870 + Math.random() * 3630;
        glitchLoopTimeoutId = window.setTimeout(() => {
            runGlitchBurst();
            scheduleNextGlitch();
        }, nextDelayMs);
    };

    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            setGlitchState(!glitchEnabled);
            scheduleNextGlitch();
        });
    }

    const startExperience = () => {
        if (hasStarted) {
            return;
        }

        hasStarted = true;
        body.classList.remove("boot-pending");

        if (bootScreen) {
            bootScreen.classList.add("is-hiding");
            window.setTimeout(() => {
                bootScreen.remove();
            }, 450);
        }

        const loadTargets = Array.from(document.querySelectorAll(".reveal-on-load"));
        loadTargets.forEach((element, index) => {
            element.classList.add("is-animated");
            element.style.setProperty("--reveal-delay", `${index * 120}ms`);
        });

        requestAnimationFrame(() => {
            loadTargets.forEach((element) => {
                element.classList.add("show");
            });
        });

        const scrollTargets = Array.from(document.querySelectorAll(".reveal-on-scroll"));
        scrollTargets.forEach((element, index) => {
            element.classList.add("is-animated");
            element.style.setProperty("--reveal-delay", `${(index % 6) * 70}ms`);
        });

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("show");
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        scrollTargets.forEach((target) => {
            observer.observe(target);
        });

        setGlitchState(!reduceMotion);
        scheduleNextGlitch();
    };

    if (bootButton) {
        bootButton.addEventListener("click", startExperience);
        bootButton.focus();
    } else {
        startExperience();
    }
});
