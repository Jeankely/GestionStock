import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    Package,
    UserCircle2,
    Phone,
    Mail,
    MapPin,
    CreditCard,
    Send,
    ShoppingBag,
    Search,
    Filter,
    ShieldCheck,
    CheckCircle2,
    X,
    AlertTriangle,
} from "lucide-react";
import { useMemo, useState } from "react";

const formatMoney = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount || 0)) + " Ar";
};

export default function Index({ products = [] }) {
    const { flash } = usePage().props;

    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [stockError, setStockError] = useState("");

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        type: "particulier",
        payment_method: "espece",
        notes: "",
        items: [],
    });

    const categories = useMemo(() => {
        const values = products
            .map((product) => product.category_name)
            .filter(Boolean);

        return ["all", ...new Set(values)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const text = `${product.name || ""} ${product.reference || ""} ${
                product.category_name || ""
            } ${product.description || ""}`.toLowerCase();

            const matchesSearch = text.includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "all" ||
                product.category_name === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, selectedCategory]);

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => {
            return total + item.selling_price * item.quantity;
        }, 0);
    }, [cart]);

    const cartItemsCount = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    const addToCart = (product) => {
        setStockError("");

        if (!product || Number(product.stock_quantity) <= 0) {
            setStockError(
                `Le produit "${product?.name || "sélectionné"}" est en rupture de stock.`
            );
            return;
        }

        setCart((currentCart) => {
            const existing = currentCart.find((item) => item.id === product.id);

            if (existing) {
                if (existing.quantity >= product.stock_quantity) {
                    setStockError(
                        `Stock insuffisant pour "${product.name}". Stock disponible : ${product.stock_quantity}.`
                    );

                    return currentCart;
                }

                return currentCart.map((item) => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }

                    return item;
                });
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    const increaseQuantity = (productId) => {
        setStockError("");

        setCart((currentCart) =>
            currentCart.map((item) => {
                if (item.id === productId) {
                    if (item.quantity >= item.stock_quantity) {
                        setStockError(
                            `Stock insuffisant pour "${item.name}". Stock disponible : ${item.stock_quantity}.`
                        );

                        return item;
                    }

                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }

                return item;
            })
        );
    };

    const decreaseQuantity = (productId) => {
        setStockError("");

        setCart((currentCart) =>
            currentCart
                .map((item) => {
                    if (item.id === productId) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }

                    return item;
                })
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setStockError("");

        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== productId)
        );
    };

    const clearCart = () => {
        setStockError("");
        setCart([]);
    };

    const submitOrder = (e) => {
        e.preventDefault();
        setStockError("");

        if (cart.length === 0) {
            setStockError("Votre panier est vide.");
            return;
        }

        const invalidItem = cart.find((item) => {
            return Number(item.stock_quantity) <= 0 || item.quantity > item.stock_quantity;
        });

        if (invalidItem) {
            setStockError(
                `Stock insuffisant pour "${invalidItem.name}". Stock disponible : ${invalidItem.stock_quantity}.`
            );
            return;
        }

        const items = cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
        }));

        transform((formData) => ({
            ...formData,
            payment_method: "espece",
            items,
        }));

        post(route("shop.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setCart([]);
                setStockError("");
                reset();
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Produits" />

            {flash?.success && (
                <div className="fixed right-4 top-24 z-50 max-w-md rounded-3xl border border-emerald-200 bg-white p-4 shadow-2xl dark:border-emerald-900 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Commande envoyée
                            </h3>
                            <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                                {flash.success}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {flash?.error && (
                <div className="fixed right-4 top-24 z-50 max-w-md rounded-3xl border border-red-200 bg-white p-4 shadow-2xl dark:border-red-900 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                            <X className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Erreur
                            </h3>
                            <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                                {flash.error}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {stockError && (
                <div className="fixed right-4 top-24 z-50 max-w-md rounded-3xl border border-amber-200 bg-white p-4 shadow-2xl dark:border-amber-900 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                            <AlertTriangle className="h-5 w-5" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Stock insuffisant
                            </h3>
                            <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                                {stockError}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setStockError("")}
                            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <section className="relative overflow-hidden bg-gradient-to-br from-cyan-700 via-sky-700 to-slate-950 text-white">
                    <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
                    <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                        <div className="grid items-center gap-10 lg:grid-cols-2">
                            <div>
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                    <ShoppingBag className="h-4 w-4" />
                                    Boutique JK TechStore
                                </div>

                                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                                    Trouvez votre matériel informatique
                                    <span className="block text-cyan-200">
                                        et commandez rapidement
                                    </span>
                                </h1>

                                <p className="mt-5 max-w-2xl text-sm leading-7 text-cyan-50 sm:text-base">
                                    Parcourez les produits disponibles, ajoutez-les
                                    dans votre panier, puis envoyez votre commande.
                                    L’équipe confirmera ensuite votre vente.
                                </p>

                                <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                                        <Package className="mb-3 h-5 w-5 text-cyan-200" />
                                        <p className="text-2xl font-bold">
                                            {products.length}
                                        </p>
                                        <p className="text-xs text-cyan-100">
                                            Produits disponibles
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                                        <ShoppingCart className="mb-3 h-5 w-5 text-cyan-200" />
                                        <p className="text-2xl font-bold">
                                            {cartItemsCount}
                                        </p>
                                        <p className="text-xs text-cyan-100">
                                            Articles au panier
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                                        <ShieldCheck className="mb-3 h-5 w-5 text-cyan-200" />
                                        <p className="text-2xl font-bold">
                                            Pro
                                        </p>
                                        <p className="text-xs text-cyan-100">
                                            Commande sécurisée
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                                        <ShoppingCart className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-cyan-100">
                                            Total panier
                                        </p>
                                        <h2 className="text-3xl font-extrabold">
                                            {formatMoney(cartTotal)}
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl bg-slate-950/30 p-4 ring-1 ring-white/10">
                                    <p className="text-sm font-semibold text-white">
                                        Comment commander ?
                                    </p>

                                    <div className="mt-4 space-y-3 text-sm text-cyan-50">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                                            Choisissez vos produits
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                                            Remplissez vos informations
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                                            Confirmez votre commande
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
                    <section className="space-y-6 lg:col-span-2">
                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Produits disponibles
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {filteredProducts.length} produit(s) trouvé(s)
                                        sur {products.length}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:w-[560px]">
                                    <div className="relative">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Rechercher un produit..."
                                            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-900/30"
                                        />

                                        {search && (
                                            <button
                                                type="button"
                                                onClick={() => setSearch("")}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30"
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category === "all"
                                                        ? "Toutes les catégories"
                                                        : category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {filteredProducts.map((product) => {
                                    const cartItem = cart.find(
                                        (item) => item.id === product.id
                                    );

                                    const quantityInCart = cartItem?.quantity || 0;
                                    const isOutOfStock =
                                        Number(product.stock_quantity) <= 0;

                                    const isMaxReached =
                                        isOutOfStock ||
                                        quantityInCart >= product.stock_quantity;

                                    return (
                                        <article
                                            key={product.id}
                                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                                        >
                                            <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Package className="h-16 w-16 text-slate-400" />
                                                    </div>
                                                )}

                                                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-cyan-700 shadow-sm backdrop-blur dark:bg-slate-900/90 dark:text-cyan-300">
                                                    {product.category_name}
                                                </div>

                                                <div
                                                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur ${
                                                        isOutOfStock
                                                            ? "bg-red-600/90"
                                                            : "bg-slate-950/70"
                                                    }`}
                                                >
                                                    {isOutOfStock
                                                        ? "Rupture"
                                                        : `Stock : ${product.stock_quantity}`}
                                                </div>
                                            </div>

                                            <div className="space-y-4 p-5">
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-400">
                                                        {product.reference}
                                                    </p>

                                                    <h3 className="mt-1 line-clamp-1 text-lg font-bold text-slate-900 dark:text-white">
                                                        {product.name}
                                                    </h3>

                                                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">
                                                        {product.description ||
                                                            "Aucune description disponible."}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                                    <div>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                            Prix
                                                        </p>
                                                        <p className="text-xl font-extrabold text-cyan-700 dark:text-cyan-300">
                                                            {formatMoney(product.selling_price)}
                                                        </p>
                                                    </div>

                                                    {quantityInCart > 0 && (
                                                        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                                                            {quantityInCart} au panier
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(product)}
                                                    disabled={isMaxReached}
                                                    className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                                        isOutOfStock
                                                            ? "bg-red-100 text-red-700 shadow-none dark:bg-red-900/20 dark:text-red-300"
                                                            : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-500/20 hover:opacity-95"
                                                    }`}
                                                >
                                                    <ShoppingCart className="h-4 w-4" />
                                                    {isOutOfStock
                                                        ? "Rupture de stock"
                                                        : isMaxReached
                                                          ? "Stock maximum atteint"
                                                          : "Ajouter au panier"}
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                                <Package className="mx-auto h-10 w-10 text-slate-400" />
                                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                                    Aucun produit trouvé
                                </h3>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    Essayez avec un autre mot-clé ou une autre catégorie.
                                </p>
                            </div>
                        )}
                    </section>

                    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                        <ShoppingCart className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900 dark:text-white">
                                            Votre panier
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {cartItemsCount} article(s)
                                        </p>
                                    </div>
                                </div>

                                {cart.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={clearCart}
                                        className="rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/20"
                                    >
                                        Vider
                                    </button>
                                )}
                            </div>

                            {cart.length > 0 ? (
                                <div className="space-y-3">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {formatMoney(item.selling_price)}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        Stock disponible : {item.stock_quantity}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="rounded-lg p-1 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>

                                                    <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() => increaseQuantity(item.id)}
                                                        disabled={item.quantity >= item.stock_quantity}
                                                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">
                                                    {formatMoney(item.selling_price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                                Total
                                            </span>
                                            <span className="text-2xl font-extrabold text-cyan-700 dark:text-cyan-300">
                                                {formatMoney(cartTotal)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                                    Votre panier est vide. Ajoutez un produit pour commencer.
                                </p>
                            )}
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Informations client
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Ces informations seront utilisées pour enregistrer votre commande.
                            </p>

                            <form onSubmit={submitOrder} className="mt-5 space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Nom complet
                                    </label>
                                    <div className="relative">
                                        <UserCircle2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            placeholder="Votre nom"
                                            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Téléphone
                                    </label>
                                    <div className="relative">
                                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData("phone", e.target.value)}
                                            placeholder="+261..."
                                            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            placeholder="email@example.com"
                                            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Type
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData("type", e.target.value)}
                                        className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    >
                                        <option value="particulier">Particulier</option>
                                        <option value="entreprise">Entreprise</option>
                                    </select>
                                    {errors.type && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Adresse
                                    </label>
                                    <div className="relative">
                                        <MapPin className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
                                        <textarea
                                            rows="3"
                                            value={data.address}
                                            onChange={(e) => setData("address", e.target.value)}
                                            placeholder="Votre adresse"
                                            className="w-full resize-none rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                                        />
                                    </div>
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Mode de paiement
                                    </label>

                                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-900/20">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 dark:bg-slate-900 dark:text-emerald-300">
                                                <CreditCard className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                                                    Paiement par espèce
                                                </p>
                                                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                                                    Pour commencer, toutes les commandes sont enregistrées avec paiement en espèce.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Note
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={data.notes}
                                        onChange={(e) => setData("notes", e.target.value)}
                                        placeholder="Message ou précision..."
                                        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                                    />
                                    {errors.notes && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.notes}
                                        </p>
                                    )}
                                </div>

                                {errors.items && (
                                    <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-300">
                                        {errors.items}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing || cart.length === 0}
                                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Send className="h-4 w-4" />
                                    {processing
                                        ? "Envoi en cours..."
                                        : "Confirmer la commande"}
                                </button>
                            </form>
                        </section>
                    </aside>
                </main>
            </div>
        </GuestLayout>
    );
}