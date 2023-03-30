FROM node:16 AS frontend-build
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && pnpm install && pnpm build

FROM node:16 AS backend-build
RUN npm install -g pnpm
WORKDIR /root/
COPY --from=frontend-build /usr/src/app/frontend/dist ./frontend/dist
COPY backend/ ./backend/
RUN cd backend && pnpm install && pnpm build

EXPOSE 8000

CMD ["node", "./backend/dist/main"]