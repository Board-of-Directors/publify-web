import {StateCreator} from "zustand";
import {Exception} from "@/app/types/entities";
import api from "@/app/api/api";
import {Article, ArticleItem, RequestArticle} from "@/app/types/article";

export type ArticleSlice = {

    article : Article,
    articleItems: ArticleItem[],
    articles: Article[],

    requestCreateArticle: RequestArticle,
    requestEditArticle: RequestArticle,

    fillCreateArticleData: (data: RequestArticle) => void,
    fillEditArticleData: (data: RequestArticle) => void,

    createArticle: (issueId: number) => Promise<Exception | void>,
    getArticles: (issueId: number) => Promise<Exception | void>,
    getArticle : (articleId : number) => Promise<Exception | void>,

    getArticleItems: (articleId: number) => Promise<Exception | void>,
    editArticle: (articleId: number, articleItems : ArticleItem[]) => Promise<Exception | void>,
    deleteArticle: (articleId: number) => Promise<Exception | void>

}

export const articleSlice: StateCreator<ArticleSlice, [], [], ArticleSlice> = (set, get) => ({

    article : {
        id : 0, name : "", description : "",
        textBlocksCount : 0, illustrationBlocksCount : 0
    },
    articleItems: [],
    articles: [],

    requestCreateArticle: {name: "", description: "", issueId: 0},
    requestEditArticle: {name: "", description: "", issueId: 0},

    fillCreateArticleData: (data: RequestArticle) => set((state) => ({
        requestCreateArticle: {
            ...state.requestCreateArticle,
            ...data
        }
    })),

    fillEditArticleData: (data: RequestArticle) => set((state) => ({
        requestEditArticle: {
            ...state.requestEditArticle,
            ...data
        }
    })),

    getArticle : async (articleId : number) => {
        return api.get('/article', {params : {articleId : articleId}})
            .then((response) => {
                set({article : response.data.result})
                return response.data.exception as Exception
            })
    },

    getArticles: async (issueId: number) => {
        return api.get('/article/search', {params: {issueId: issueId}})
            .then((response) => {
                set({articles: response.data.result})
                return response.data.exception as Exception
            })
    },

    createArticle: async (issueId: number) => {

        set((state) => ({
            requestCreateArticle: {
                ...state.requestCreateArticle,
                issueId: issueId
            }
        }))

        return api.post("/article", get().requestCreateArticle)
            .then(response => response.data.exception as Exception)

    },

    editArticle: async (articleId: number, articleItems : ArticleItem[]) => {
        return api.put('/article/items', articleItems, {params: {articleId: articleId}})
            .then((response) => response.data.exception as Exception)
    },

    deleteArticle: async (articleId: number) => {
        return api.delete('/article', {params: {articleId: articleId}})
            .then((response) => response.data.exception as Exception)
    },

    getArticleItems: async (articleId: number) => {
        return api.get('/article/items', {params: {articleId: articleId}})
            .then((response) => {
                set({articleItems: response.data.result})
                return response.data.exception as Exception
            })
    }

})