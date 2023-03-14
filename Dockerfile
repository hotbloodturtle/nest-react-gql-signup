FROM node:16 AS frontend-build
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && pnpm install --frozen-lockfile && pnpm build

FROM node:16 AS backend-build
RUN npm install -g pnpm
WORKDIR /root/
COPY --from=frontend-build /usr/src/app/frontend/dist ./frontend/dist
COPY backend/ ./backend/
RUN cd backend && pnpm install --frozen-lockfile && pnpm build

EXPOSE 3000

CMD ["node", "./backend/dist/src/main"]